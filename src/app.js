const express = require('express');
const fetch = require('node-fetch');
const winston = require('winston');
const schedule = require('node-schedule');
winston.add(winston.transports.File, {
  filename: 'lazyJarLogs.log'
});
const url = require('url');

const config = require('./config.json');
const {
  host,
  port,
  client_id,
  client_secret,
  slack_auth_uri,
  slack_access_uri,
  scope
} = config;

const redirect_uri = `${host}:${port}/oauth/redirect`;
const errorMap = require('./errorMap');
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
  getUsersInfo
} = require('./helpers')(fetch, url, winston, saveLog, saveSecret, config);

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

app.get('/oauth/redirect', async(req, res) => {
  const {
    code,
    state
  } = req.query;
  try {
    await getSecretsAndSave(code);
    res.send('Thank you, you have successfully authenticated your team!');
  }
  catch (err) {
    winston.error(`Team authencation failed, ${err}`);
    res.send(
      'Oops, an error occured while authenticating your team, please try again!'
    );
  }
});

app.post('/api/command', (req, res) => {
  respond(req.body)
    .then(() => res.send('Success!'))
    .catch(err => {
      if (errorMap.get(err.code)) {
        res.send(errorMap.get(err.code))
        winston.error(`${err.code} ${err.message}`)
      }
      else res.send('Something went wrong, please try again later')
      console.log(err);
    });
});

app.listen(port, () => console.log(`listening on port ${port}!`));

async function respond({
  team_id,
  user_id,
  text,
  channel_id
}) {
  const secret = await getSecret({
    team_id
  });
  const token = secret.bot.bot_access_token;
  const command = parser(text);
  if (command.type === 'STATUS') {
    const statusMap = await status(team_id);
    await sendMessage(channel_id, token, JSON.stringify(statusMap));
  }
  else {
    await executeCommand({
      team_id,
      user_id,
      command,
      token
    });
  }
}

async function executeCommand({
  team_id,
  user_id,
  command,
  token
}) {
  const events = await getEventsFor({
    team_id
  });
  const eventIds = new Set(events.map(e => e.event_id));
  const usersInfo = await getUsersInfo(token);
  const action = createAction(command, usersInfo, user_id, eventIds, 'UTC');
  const currState = await getState(team_id, action.event);
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
}
