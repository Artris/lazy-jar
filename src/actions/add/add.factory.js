module.exports = (eventExists, mapUsernameToUserInfo, ADD) => {
  return (parsedCommand, usernameToIds, myUserID, events) => {
    const { to, usernames } = parsedCommand;
    eventExists(to, events);
    return {
      type: ADD,
      event: to,
      userInfos: mapUsernameToUserInfo(usernames, usernameToIds, myUserID)
    };
  };
};
