const express = require('express');
const fetch = require('node-fetch');
const winston = require('winston');
const schedule = require('node-schedule-tz');
const NodeRSA = require('node-rsa');
winston.add(winston.transports.File, {
  filename: 'lazyJarLogs.log'
});
const url = require('url');
const { stripIndent } = require('common-tags');

const config = require('./config.json');
const {
  host,
  port,
  client_id,
  client_secret,
  slack_auth_uri,
  slack_access_uri,
  scope,
  rsa_private_key
} = config;

const key = new NodeRSA(rsa_private_key);

const redirect_uri = `${host}/oauth/redirect`;
const notification_url = `${host}/api/notification/`;
const { errorMap } = require('./customError/errorMap');
const parser = require('./parser/index');
const createAction = require('./actions/index');
const reduce = require('./reducers/index');

const {
  saveSecret,
  saveState,
  saveLog,
  getLogsForTeam,
  getSecret,
  getState,
  getEventsFor
} = require('./database/helpers/helpers.js');

const {
  notifyUsers,
  sendMessage,
  getSecretsAndSave,
  getUsernameToIdMap,
  getUsersInfo,
  confirmationMessage
} = require('./helpers')(
  fetch,
  url,
  winston,
  saveLog,
  saveSecret,
  config,
  key,
  notification_url
);

const Job = require('./scheduler/job.factory')(
  getState,
  getSecret,
  notifyUsers,
  () => false,
  winston
);

const toCronString = require('./scheduler/to-cron-string');

const scheduler = require('./scheduler/scheduler.factory')(
  schedule,
  toCronString,
  Job
);

const status = require('./status/status.factory')(getLogsForTeam, winston);
const format = require('./status/formatter');

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
);

app.get('/oauth/authorize', (req, res) => {
  const params = {
    client_id,
    client_secret,
    redirect_uri,
    scope: scope.join(' ')
  };

  const auth_url = url.format({
    pathname: slack_auth_uri,
    query: params
  });
  res.redirect(auth_url);
});

app.get('/oauth/redirect', async (req, res) => {
  const { code, state } = req.query;
  try {
    await getSecretsAndSave(code);
    res.send('Thank you, you have successfully authenticated your team!');
  } catch (err) {
    winston.error(`Team authencation failed, ${err}`);
    res.send(
      'Oops, an error occured while authenticating your team, please try again!'
    );
  }
});

app.post('/api/command', (req, res) => {
  respond(req.body)
    .then(message => res.send(message))
    .catch(err => {
      winston.error(err);
      if (errorMap.get(err.code)) {
        res.send(errorMap.get(err.code));
      } else
        res.send(
          'Oh-oh! Something went wrong. Please try again later. :upside_down_face:'
        );
    });
});

app.post('/api/notifications', async (req, res) => {
  const payload = JSON.parse(req.body.payload),
    notification = payload.actions.find(e => e.name === 'notification').value,
    [team_id, event_id, date, user_id] = notification.split(',');

  saveLog({ team_id, event_id, user_id, date, action: 'participated' });

  const secret = await getSecret({ team_id }),
    token = secret.bot.bot_access_token;

  const event = await getState({ team_id, event_id });

  const channel = payload.channel.id,
    ts = payload.message_ts;

  const params = {
    token,
    channel,
    ts,
    text: 'Thank you for participating!',
    attachments: JSON.stringify([
      {
        fallback: 'https://http.cat/500',
        actions: [
          {
            type: 'button',
            text: 'Join now',
            url: event.url
          }
        ]
      }
    ])
  };

  const request = url.format({
    pathname: 'https://slack.com/api/chat.update',
    query: params
  });

  try {
    let response = await fetch(request, {
      method: 'POST'
    });
    response = await response.json();
    if (response.ok) {
      res.status(200).end();
    } else {
      winston.error(stripIndent`
        Could not updated the interactive message
        Response: ${response}
        Payload: ${req.body.paylodad}
      `);
      res.send(
        'Oh-oh! Something went wrong. Please try again later. :upside_down_face:'
      );
    }
  } catch (err) {
    winston.error(stripIndent`
      Could not updated the interactive message
      Error: ${err}
      Payload: ${req.body.payloda}
    `);
    res.send(
      'Oh-oh! Something went wrong. Please try again later. :upside_down_face:'
    );
  }
});

app.listen(port, () => console.log(`listening on port ${port}!`));

async function respond({ team_id, user_id, text, channel_id }) {
  const secret = await getSecret({ team_id });
  const token = secret.bot.bot_access_token;

  const command = parser(text);
  if (command.type === 'STATUS') {
    const statusFormatted = await readableStatus(team_id, token);
    await sendMessage(channel_id, token, statusFormatted);
  } else {
    const actionAndState = await executeCommand({
      team_id,
      user_id,
      command,
      token
    });
    return confirmationMessage(actionAndState);
  }
}

function reverseMap(map) {
  return new Map([...map.entries()].map(([key, value]) => [value, key]));
}

async function readableStatus(team_id, token) {
  const usernameToUserId = await getUsernameToIdMap(token);
  const userIdToUsername = reverseMap(usernameToUserId);
  const info = await status(team_id);
  return format(info, userIdToUsername);
}

async function executeCommand({ team_id, user_id, command, token }) {
  const events = await getEventsFor({ team_id });
  const eventIds = new Set(events.map(e => e.event_id));
  const usersInfo = await getUsersInfo(token);

  const action = createAction(command, usersInfo, user_id, eventIds);
  let currState = await getState({ team_id, event_id: action.event });
  /*we need to convert the state returned from the db into a js object*/
  currState = currState === null ? currState : currState.toObject();
  const nextState = await reduce(action, currState);
  // TODO: a new state out of the reducer should already include the team_id
  nextState.team_id = team_id;

  await saveState(nextState);
  switch (action.type) {
    case 'SCHEDULE':
      scheduler.add([nextState]);
      break;
    case 'HALT':
    case 'TERMINATE':
      scheduler.cancel([nextState]);
      break;
    case 'MOVE':
      scheduler.reschedule([nextState]);
      break;
  }

  return { action, state: nextState };
}
