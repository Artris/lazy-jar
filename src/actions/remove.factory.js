module.exports = (eventExists, mapUsernameToIDs, REMOVE) => {
  return (parsedCommand, usernameToIds, myUserId, events) => {
    const { event, usernames } = parsedCommand;
    eventExists(event, events);
    return {
      type: REMOVE,
      event,
      userIds: mapUsernameToIDs(usernames, usernameToIds, myUserId)
    };
  };
};
