module.exports = (eventExists, mapUsernameToUserInfo, REMOVE) => {
  return (parsedCommand, usernameToIds, myUserId, events) => {
    const { event, usernames } = parsedCommand;
    eventExists(event, events);
    return {
      type: REMOVE,
      event,
      userInfos: mapUsernameToUserInfo(usernames, usernameToIds, myUserId)
    };
  };
};
