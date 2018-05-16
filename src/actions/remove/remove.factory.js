module.exports = (eventExists, mapUsernameToUserInfo, REMOVE) => {
  return (parsedCommand, usernameToIds, myUserId, events) => {
    const { from, usernames } = parsedCommand;
    // console.log(events.has(from));
    eventExists(from, events);
    console.log(from);
    return {
      type: REMOVE,
      from,
      userInfos: mapUsernameToUserInfo(usernames, usernameToIds, myUserId)
    };
  };
};
