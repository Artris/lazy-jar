module.exports = (eventExists, mapUsernameToUserInfo, REMOVE) => {
  return (parsedCommand, usernameToIds, myUserId, events) => {
    const { from, usernames } = parsedCommand;
    eventExists(from, events);
    return {
      type: REMOVE,
      event: from,
      userInfos: mapUsernameToUserInfo(usernames, usernameToIds, myUserId)
    };
  };
};
