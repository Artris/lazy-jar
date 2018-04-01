const express = require('express');
const fetch = require('node-fetch');
const url = require('url');
const config = require('./config.json');

const { client_id, client_secret, scope, host, port } = config;
const redirect_uri = `${host}:${port}/oauth/redirect`;
const slack_auth_uri = 'https://slack.com/oauth/authorize';
const slack_access_uri = 'https://slack.com/api/oauth.access';

const winston = require('winston');
winston.add(winston.transports.File, { filename: 'lazyJarLogs.log' });

const app = express();

app.use(express.urlencoded({ extended: true }));

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
  winston.info(`Oauth authourization request made ${JSON.toString(req)}`);
  res.redirect(auth_url);
});


function requestAccess(code) {
  const params = {
    client_id,
    client_secret,
    redirect_uri,
    code
  };
  const access_url = url.format({
    pathname: slack_access_uri,
    query: params
  });

  fetch(access_url)
    .then(res => res.json());
}

function getToken(code) {
  requestAccess(code)
    .then(res => {})
    .catch(err => {})
}

app.get('/oauth/redirect', (req, res) => {
  const { code, state } = req.query;
  requestAccess(code);
  res.send('Thank you!');
});

app.post('/api/command', (req, res) => {
  console.log(req.body);
});

app.listen(port, () => console.log(`listening on port ${port}!`));