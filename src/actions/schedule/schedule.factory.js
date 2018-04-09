module.exports = (
  eventExists,
  eventAlreadyExists,
  mapUsernameToUserInfo,
  mapToTime,
  mapToFrequency,
  SCHEDULE
) => {
  return (parsedCommand, usernameToIds, myUserID, events, zone = 'UTC') => {
    const { event, usernames, when } = parsedCommand;
    eventAlreadyExists(event, events);
    return {
      type: SCHEDULE,
      event,
      userInfos: mapUsernameToUserInfo(usernames, usernameToIds, myUserID),
      time: mapToTime(when, zone),
      frequency: mapToFrequency(when)
    };
  };
};
