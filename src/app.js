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
  saveSecret,
  saveState,
  saveLog,
  getSecret,
  getState,
  getLogsForEvent,
  getEventsFor
} = require('./database/helpers/helpers.js');

const {
  notifyUsers,
  getSecretsAndSave,
  getUsersInfo
} = require('./app-helpers/slack')({
  fetch,
  winston,
  url,
  undefined,
  saveSecret
});

const redirect_uri = `${host}:${port}/oauth/redirect`;
const parser = require('./parser/index');
const createAction = require('./actions/index');
const lazyJar = require('./reducers/index');

const {
  getTeamEventsSet,
  interpretCommand,
  getPreviousState,
  updateState
} = require('./app-helpers/command')(
  getEventsFor,
  parser,
  createAction,
  getState,
  lazyJar,
  saveState,
  winston
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

app.get('/oauth/redirect', async (req, res) => {
  const { code, state } = req.query;
  try {
    await getSecretsAndSave(code);
    winston.info(`Team authencation successful`);
    res.send('Thank you, you have successfully authenticated your team!');
  } catch (e) {
    winston.error(`Team authencation failed, ${e}`);
    res.send(
      'Oops, an error occured while authenticating your team, please try again!'
    );
  }
});

app.post('/api/command', (req, res) => {
  command(req.body)
    .then(() => {
      res.send('State updated');
    })
    .catch(err => {
      res.send('Something is wrong, please try again later');
      console.log(err);
    });
});

async function command({ team_id, user_id, text }) {
  const secret = await getSecret({ team_id });
  const teamEvents = await getTeamEventsSet(team_id);

  const usersInfo = await getUsersInfo(secret.bot.bot_access_token);
  const action = await interpretCommand(text, usersInfo, user_id, teamEvents);
  const prevState = await getPreviousState(team_id, action.event);
  const updatedState = await updateState(action, prevState, team_id);

  switch (action.type) {
    case 'SCHEDULE':
      scheduler.add([updatedState]);
      break;
    case 'HALT':
    case 'TERMINATE':
      scheduler.cancel([updatedState]);
      break;
    case 'MOVE':
      scheduler.reschedule([updatedState]);
      break;
  }
}

app.listen(port, () => console.log(`listening on port ${port}!`));
