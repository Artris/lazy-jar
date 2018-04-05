const express = require('express');
const fetch = require('node-fetch');
const winston = require('winston');
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
} = config
const {
    createUsernameToIdMap,
    createUserIdToImId,
    notifyUsers
} = require('./slack/helpers')({ config, fetch, winston, url });
const {
    saveSecrets,
    returnSecrets,
    returnEventsByTeamId,
    saveState,
    returnState
} = require('./database/helpers/helpers.js');
const redirect_uri = `${host}:${port}/oauth/redirect`;
const parser = require('./parser/index');
const createAction = require('./actions/index')
const {
    lazyJar
} = require('./reducers/index')


const app = express();

app.use(express.urlencoded({
    extended: true
}));

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
    const {
        code,
        state
    } = req.query;
    try {
        await getSecretsAndSave(code);
        winston.info(`Team authencation successful`);
        res.send('Thank you, you have successfully authenticated your team!');
    }
    catch (e) {
        winston.error(`Team authencation failed, ${e}`);
        res.send('Oops, an error occured while authenticating your team, please try again!');
    }
});

app.post('/api/command', (req, res) => {
    const {
        team_id,
        user_id,
        text
    } = req.body;

    returnSecrets({
        team_id
    }).then(async(result) => {
        let userMap, action, teamEvents, prevState;
        const {
            bot: {
                bot_access_token
            }
        } = result.pop();
        try {
            userMap = await getUserMap(bot_access_token);
            teamEvents = await getTeamEventsSet(team_id);

        }
        catch (e) {
            res.send("An error has occured, please try again later");
        }
        try {
            action = await interpretCommand(text, userMap, user_id, teamEvents);
            try {
                prevState = await getPreviousState(team_id, action.event);
                await updateState(action, prevState, team_id);
                // TODO: send back meaningful messages to user based on action
                res.send("State updated");
            }
            catch (e) {
                res.send("An error has occured, please try again later");
            }
        }
        catch (e) {
            res.send(e.toString());
        }
    });
});

app.listen(port, () => console.log(`listening on port ${port}!`));

function requestAccessFromSlack(code) {
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
    return fetch(access_url)
        .then(res => res.json());
}

async function getSecretsAndSave(code) {
    requestAccessFromSlack(code)
        .then(({
            team_id,
            access_token,
            bot: {
                bot_user_id,
                bot_access_token
            }
        }) => {
            // Save the team secret
            saveSecrets({
                team_id,
                access_token,
                bot_user_id,
                bot_access_token
            }).then(res => {
                winston.info(`Saving the team secret was successful`);
            }).catch(e => {
                winston.error(`an error occured while trying to save the team secret: ${code}`);
                throw e;
            });
        })
        .catch(e => {
            winston.error(`Getting team secret from Slack failed ${code}`);
            throw e;
        })
}

async function getUserMap(access_token) {
    try {
        return await createUsernameToIdMap(access_token);
    }
    catch (e) {
        winston.error(`An error occured while creating userName to userId map ${e}`);
        throw e;
    }
}

async function getTeamEventsSet(team_id) {
    try {
        let events = await returnEventsByTeamId({
            team_id
        });
        //the validator accepts a set of events
        return new Set(events);
    }
    catch (e) {
        winston.error(`An error occured retriving list of events for team from database: ${e}`);
        throw e;
    }
}

async function interpretCommand(text, userMap, user_id, teamEvents) {
    try {
        const parsedCommand = parser(text)
        return createAction(parsedCommand, userMap, user_id, teamEvents, 'UTC');
    }
    catch (e) {
        winston.error(`An error occurred while intepreting the user command: ${e}`);
        throw e;
    }
}

async function getPreviousState(team_id, event_id) {
    try {
        let prevState;
        prevState = await returnState({
            team_id,
            event_id
        });
        //here we need to convert object returned from mongoose to a javascript object
        prevState = (prevState[0] === undefined) ? {} : (prevState.pop()).toObject();
        return prevState;
    }
    catch (e) {
        winston.error(`An error occurred while retrieving the previous state from the database: ${e}`);
        throw e;
    }
}

async function updateState(action, prevState, team_id) {
    let newState = lazyJar(action, prevState)
    //the reducer does not return a state with the team_id, so we add it here
    newState.team_id = team_id
    try {
        await saveState(newState);
    }
    catch (e) {
        winston.error(`An error occured while updating the state of the database: ${e}`);
        throw e;
    }
}
