module.exports = (
  eventExists,
  eventAlreadyExists,
  mapUsernameToUserInfo,
  mapToTime,
  mapToFrequency,
  timezoneExists, 
  SCHEDULE,
  moment_tz
) => {
  return (parsedCommand, usernameToIds, myUserID, events) => {
    const { event, usernames, when, zone } = parsedCommand;
    eventAlreadyExists(event, events);
    return {
      type: SCHEDULE,
      event,
      userInfos: mapUsernameToUserInfo(usernames, usernameToIds, myUserID),
      time: mapToTime(when, zone, moment_tz),
      frequency: mapToFrequency(when)
    };
  };
};
