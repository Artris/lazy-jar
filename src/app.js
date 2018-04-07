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

const {
  saveSecrets,
  returnSecrets,
  returnEventsByTeamId,
  saveState,
  returnState,
  getEvent
} = require('./database/helpers/helpers.js');

const {
  createUsernameToIdMap,
  createUserIdToImId,
  notifyUsers,
  getSecretsAndSave
} = require('./app-helpers/slack')({
  config,
  fetch,
  winston,
  url,
  undefined,
  saveSecrets
});

const redirect_uri = `${host}:${port}/oauth/redirect`;
const parser = require('./parser/index');
const createAction = require('./actions/index');
const lazyJar = require('./reducers/index');

const {
  getUserMap,
  getTeamEventsSet,
  interpretCommand,
  getPreviousState,
  updateState
} = require('./app-helpers/command')(
  createUsernameToIdMap,
  returnEventsByTeamId,
  parser,
  createAction,
  returnState,
  lazyJar,
  saveState,
  winston
);

const Job = require('./scheduler/job.factory')(
  getEvent,
  returnSecrets,
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
  winston.info(`Oauth authourization request made, redirecting to slack`);
  res.redirect(auth_url);
});

app.get('/oauth/redirect', async(req, res) => {
  const { code, state } = req.query;
  try {
    await getSecretsAndSave(code);
    winston.info(`Team authencation successful`);
    res.send('Thank you, you have successfully authenticated your team!');
  }
  catch (e) {
    winston.error(`Team authencation failed, ${e}`);
    res.send(
      'Oops, an error occured while authenticating your team, please try again!'
    );
  }
});

app.post('/api/command', (req, res) => {
  const { team_id, user_id, text } = req.body;

  returnSecrets({
    team_id
  }).then(async result => {
    let userMap, action, teamEvents, prevState;
    const { bot: { bot_access_token } } = result.pop();
    try {
      userMap = await getUserMap(bot_access_token);
      teamEvents = await getTeamEventsSet(team_id);
    }
    catch (e) {
      res.send('An error has occured, please try again later');

    }
    try {
      action = await interpretCommand(text, userMap, user_id, teamEvents);
      try {
        prevState = await getPreviousState(team_id, action.event);
        const updatedState = await updateState(action, prevState, team_id);
        const spec = { frequency: updatedState.frequency, time: updatedState.time };
        if (action.type === 'SCHEDULE') {
          scheduler.add([{ team_id: updatedState.team_id, event_id: updatedState.event_id, spec }]);
        }
        else if (action.type === 'HALT' || action.type === 'TERMINATE') {
          scheduler.cancel([updatedState]);
        }
        else if (action.type === 'MOVE') {
          scheduler.reschedule([updatedState]);
        }
        // TODO: send back meaningful messages to user based on action
        res.send('State updated');
      }
      catch (e) {
        res.send('An error has occured, please try again later');
      }
    }
    catch (e) {
      res.send(e.toString());
    }
  });
});

app.listen(port, () => console.log(`listening on port ${port}!`));
