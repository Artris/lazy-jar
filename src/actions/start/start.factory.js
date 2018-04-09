module.exports = (eventExists, mapUsernameToUserInfo, START) => {
  return (parsedCommand, usernameToIds, myUserId, events) => {
    const { name, username } = parsedCommand;
    eventExists(name, events);
    return {
      type: START,
      event: name,
      userInfo: mapUsernameToUserInfo([username], usernameToIds, myUserId).pop()
    };
  };
};
