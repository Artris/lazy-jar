module.exports = (eventExists, mapUsernameToIDs, mapPeriodtoDate, SKIP, moment) => {
  return (parsedCommand, usernameToIds, myUserID, events) => {
    const { event, username, name } = parsedCommand;
    eventExists(name, events);
    return {
      type: SKIP,
      event: name,
      userId: mapUsernameToIDs([username], usernameToIds, myUserID).pop(),
      skip_until: mapPeriodtoDate(parsedCommand.for, moment)
    };
  };
};

