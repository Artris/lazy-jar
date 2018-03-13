module.exports = (eventExists, mapUsernameToIDs, mapPeriodtoDays, SKIP) => {
  return (parsedCommand, usernameToIds, myUserID, events) => {
    const { event, username, name } = parsedCommand;
    eventExists(name, events);
    return {
      type: SKIP,
      event: name,
      userId: mapUsernameToIDs([username], usernameToIds, myUserID).pop(),
      days: mapPeriodtoDays(parsedCommand.for)
    };
  };
};
