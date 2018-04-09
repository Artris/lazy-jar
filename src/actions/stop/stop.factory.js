module.exports = (eventExists, mapUsernameToUserInfo, STOP) => {
  return (parsedCommand, usernameToIds, myUserId, events) => {
    const { name, username } = parsedCommand;
    eventExists(name, events);
    return {
      type: STOP,
      event: name,
      userInfo: mapUsernameToUserInfo([username], usernameToIds, myUserId).pop()
    };
  };
};
