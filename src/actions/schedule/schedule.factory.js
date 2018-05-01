module.exports = (
  eventExists,
  eventAlreadyExists,
  mapUsernameToUserInfo,
  mapToTime,
  mapToFrequency,
  SCHEDULE,
  moment_tz
) => {
  return (parsedCommand, usernameToIds, myUserID, events) => {
    const { event, usernames, when } = parsedCommand;
    eventAlreadyExists(event, events);
    return {
      type: SCHEDULE,
      event,
      userInfos: mapUsernameToUserInfo(usernames, usernameToIds, myUserID),
      time: mapToTime(when, moment_tz),
      frequency: mapToFrequency(when)
    };
  };
};
