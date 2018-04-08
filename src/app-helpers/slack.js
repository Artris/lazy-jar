// TODO: refactor this, can be palced in a better place
const {
  client_id,
  client_secret,
  redirect_uri,
  slack_access_uri,
  team_token,
  slack_im_list,
  slack_user_list,
  slack_message_channel
} = require('../config.json');

module.exports = ({ fetch, winston, url, logNotification, saveSecret }) => {
  async function getUsernameToIdMap(team_token) {
    let params = {
      token: team_token,
      scope: 'bot'
    };

    let urlRequest = url.format({
      pathname: slack_user_list,
      query: params
    });

    // Get list of users and return map of userName => userId
    try {
      const response = await fetch(urlRequest);
      const jsonResp = await response.json();
      return new Map(jsonResp.members.map(item => ['@' + item.name, item.id]));
    } catch (e) {
      winston.error(
        `An error occured while fetching user.list from slack: ${e}`
      );
      throw e;
    }
  }

  async function getUserIdToImIdMap(team_token) {
    let params = {
      token: team_token,
      scope: 'bot'
    };

    let urlRequest = url.format({
      pathname: slack_im_list,
      query: params
    });

    // Get list of users and return map of userId => userIm Id
    try {
      const response = await fetch(urlRequest);
      const jsonResp = await response.json();
      return new Map(jsonResp.ims.map(item => [item.user, item.id]));
    } catch (e) {
      winston.error(`An error occured while fetching im.list from slack: ${e}`);
      throw e;
    }
  }

  async function getUsersInfo(team_token) {
    const userIdToImId = await getUsernameToIdMap(team_token);
    const usernameToId = await getUsernameToIdMap(team_token);
    const userInfo = new Map();
    for (let [name, id] in usernameToId.entries()) {
      if (userIdToImId.has(id)) {
        userInfo.set(name, { user_id: id, user_im_id: userIdToImId.get(id) });
      }
    }
    return userInfo;
  }

  async function sendDirectMessage(im_id, team_token, message) {
    let params = {
      token: team_token,
      scope: 'bot',
      channel: im_id,
      text: message
    };

    let urlRequest = url.format({
      pathname: slack_message_channel,
      query: params
    });

    try {
      const response = await fetch(urlRequest, { method: 'POST' });
      const jsonResp = await response.json();
    } catch (e) {
      winston.error(
        `An error occured while posting a message to the user chat.postMessage : ${e}`
      );
      throw e;
    }
  }

  async function notifyUsers(
    team_id,
    access_token,
    activeMembers,
    eventName,
    eventUrl,
    fireDate
  ) {
    console.log(
      '1',
      team_id,
      access_token,
      activeMembers,
      eventName,
      eventUrl,
      fireDate
    );
    return Promise.all(
      activeMembers.map(({ user_id, user_im_id }) => {
        // TODO: Add interactive messages with a value as the following
        const message = `${team_id} ${eventName} ${user_id}$ ${fireDate}`;
        sendDirectMessage(user_im_id, team_token, message).then(res =>
          logNotification(team_id, eventName, user_id, fireDate, 'Notified')
        );
      })
    );
  }

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

    return fetch(access_url).then(res => res.json());
  }

  async function getSecretsAndSave(code) {
    requestAccessFromSlack(code)
      .then(
        ({ team_id, access_token, bot: { bot_user_id, bot_access_token } }) => {
          // Save the team secret
          saveSecret({
            team_id,
            access_token,
            bot: { bot_user_id, bot_access_token }
          })
            .then(res => {
              winston.info(`Saving the team secret was successful`);
            })
            .catch(e => {
              winston.error(
                `an error occured while trying to save the team secret: ${code}`
              );
              throw e;
            });
        }
      )
      .catch(e => {
        winston.error(`Getting team secret from Slack failed ${code}`);
        throw e;
      });
  }

  return {
    notifyUsers,
    createUserIdToImId,
    getSecretsAndSave
  };
};
