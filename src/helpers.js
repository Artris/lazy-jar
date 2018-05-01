module.exports = (fetch, url, logger, saveLog, saveSecret, config) => {
  const {
    client_id,
    client_secret,
    redirect_uri,
    slack_access_uri,
    team_token,
    slack_im_list,
    slack_user_list,
    slack_message_channel
  } = config;

  /**
   * Helper functions to get users information
   */
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
    } catch (err) {
      logger.error(
        `An error occured while fetching user.list from slack: ${err}`
      );
      throw err;
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
    } catch (err) {
      logger.error(
        `An error occured while fetching im.list from slack: ${err}`
      );
      throw err;
    }
  }

  async function getUsersInfo(team_token) {
    const userIdToImId = await getUserIdToImIdMap(team_token);
    const usernameToId = await getUsernameToIdMap(team_token);
    const userInfo = new Map();
    for (let [name, id] of usernameToId.entries()) {
      if (userIdToImId.has(id)) {
        userInfo.set(name, { user_id: id, user_im_id: userIdToImId.get(id) });
      }
    }
    return userInfo;
  }

  /**
   * Helper functions to notify users
   */
  async function sendMessage(channel, token, message) {
    let params = {
      token: token,
      scope: 'bot',
      channel: channel,
      text: message
    };

    let urlRequest = url.format({
      pathname: slack_message_channel,
      query: params
    });

    try {
      const response = await fetch(urlRequest, { method: 'POST' });
      const jsonResp = await response.json();
    } catch (err) {
      logger.error(
        `An error occured while posting a message to the user chat.postMessage : ${err}`
      );
      throw err;
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
    return Promise.all(
      activeMembers.map(({ user_id, user_im_id }) => {
        // TODO: Add interactive messages with a value similar to message
        const message = `${team_id} ${eventName} ${user_id} ${fireDate}`;
        sendMessage(user_im_id, access_token, message).then(res =>
          saveLog({
            team_id,
            event_id: eventName,
            user_id,
            date: fireDate,
            action: 'Notified'
          })
        );
      })
    );
  }

  /**
   * Helpers functions for requesting access from slack
   */
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
    return requestAccessFromSlack(code).then(secret => {
      return saveSecret(secret);
    });
  }

  return {
    notifyUsers,
    sendMessage,
    getUsersInfo,
    getUsernameToIdMap,
    getSecretsAndSave
  };
};
