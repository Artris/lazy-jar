module.exports = (eventExists, mapUsernameToIDs, ADD) => {
  return (parsedCommand, usernameToIds, myUserID, events) => {
    const { to, usernames } = parsedCommand;
    eventExists(to, events);
    return {
      type: ADD,
      event: to,
      userIds: mapUsernameToIDs(usernames, usernameToIds, myUserID)
    };
  };
};
