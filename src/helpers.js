const {
  ADD,
  REMOVE,
  HALT,
  MOVE,
  RESUME,
  SCHEDULE,
  SKIP,
  STATUS,
  TERMINATE,
  START,
  STOP,
  SET
} = require('./commands');

module.exports = (
  fetch,
  url,
  logger,
  saveLog,
  saveSecret,
  config,
  key,
  notification_url
) => {
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
  async function sendMessage(channel, token, text, attachments) {
    let params = {
      token,
      scope: 'bot',
      channel,
      text
    };

    if (attachments) {
      params['attachments'] = JSON.stringify(attachments);
    }

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
        const text = 'Your meeting is about to start';

        const value = `${team_id},${eventName},${fireDate},${user_id}`,
          cipher = key.encrypt(value, 'base64');
        const meeting_url = `${notification_url}${cipher}`;
        const attachemnts = [
          {
            fallback: `click on the following link to join the meeting ${meeting_url}`,
            actions: [
              {
                type: 'button',
                style: 'primary',
                text: 'Join Now',
                url: meeting_url
              }
            ]
          }
        ];

        sendMessage(user_im_id, access_token, text, attachemnts).then(res =>
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

  function confirmationMessage({ action, state }) {
    const { event_id } = state;
    switch (action.type) {
      case SCHEDULE:
        return `Successfully scheduled ${event_id}. Make sure to specify the URL for the meeting!`;
      case MOVE:
        return `Successfully rescheduled ${event_id}`;
      case ADD:
        return `Successfully added new members to ${event_id}`;
      case REMOVE:
        return `Successfully removed members from ${event_id}`;
      case SKIP:
        return `You will not receive notifications until ${action.skip_until}`;
      case START:
        return `You will start receiving notifications from now for ${event_id}`;
      case STOP:
        return `You won't receive any further notifications for ${event_id}. To participate again use the "start" command`;
      case HALT:
        return `${event_id} is halted. To start the meeting again, use the "resume" command`;
      case RESUME:
        return `${event_id} is active again`;
      case TERMINATE:
        return `Successfully deleted ${event_id}`;
      case SET:
        return `Successfully added url: ${action.url} for ${event_id}`;
    }
  }

  return {
    notifyUsers,
    sendMessage,
    getUsersInfo,
    getUsernameToIdMap,
    getSecretsAndSave,
    confirmationMessage
  };
};
