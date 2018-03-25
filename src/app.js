const express = require('express');
const fetch = require('node-fetch');
const url = require('url');
const port = process.env.PORT;
const mongoHelper = require("../lib/mongodb");
const config = require('./config.json');
const { client_id, client_secret, scope, host } = config;
const redirect_uri = `${host}:${port}/oauth/redirect`;
const slack_auth_uri = 'https://slack.com/oauth/authorize';
const slack_access_uri = 'https://slack.com/api/oauth.access';
const assert = require('assert');
const app = express();


async function insertData( { team_id : id , data} = {} ){
  let result = await mongoHelper.connectToMongo();
  result.collection("secrets").insertOne({ "_id": id, "data":data }).then((result) =>{
    console.log(result);
  }).catch((e)=>{
    console.error(e);
  });
}

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
    .then(res => res.json())
    .then(res => {
      let {team_id} = res;
      insertData(team_id, res);
      return res;
    });
}

app.get('/oauth/redirect', (req, res) => {
  const { code, state } = req.query;
  requestAccess(code);
  res.send('Thank you!');
});

app.post('/api/command', (req, res) => {
  console.log(req.body);
  getMongoClent().collection("secrets").findOne({ "_id": req.body.team_id }).then( result => {
    console.log(result.data);
    res.status(200).json({ "text": JSON.stringify(result.data) });
  }).catch(e => {
    console.error(e);
  });
  
});

app.listen(port, () => console.log(`listening on port ${port}!`));