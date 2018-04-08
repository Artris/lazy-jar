module.exports = (
  add,
  remove,
  halt,
  move,
  resume,
  schedule,
  skip,
  terminate,
  start,
  stop,
  ADD,
  REMOVE,
  HALT,
  MOVE,
  RESUME,
  SCHEDULE,
  SKIP,
  TERMINATE,
  START,
  STOP
) => {
  return (parsedCommand, mapUsernameToUserInfo, myUserInfo, events, zone) => {
    switch (parsedCommand.type) {
      case ADD:
        return add(parsedCommand, mapUsernameToUserInfo, myUserInfo, events);
      case REMOVE:
        return remove(parsedCommand, mapUsernameToUserInfo, myUserInfo, events);
      case HALT:
        return halt(parsedCommand, events);
      case MOVE:
        return move(parsedCommand, events, zone);
      case RESUME:
        return resume(parsedCommand, events);
      case SCHEDULE:
        return schedule(
          parsedCommand,
          mapUsernameToUserInfo,
          myUserInfo,
          events,
          zone
        );
      case SKIP:
        return skip(parsedCommand, mapUsernameToUserInfo, myUserInfo, events);
      case TERMINATE:
        return terminate(parsedCommand, events);
      case START:
        return start(parsedCommand, mapUsernameToUserInfo, myUserInfo, events);
      case STOP:
        return stop(parsedCommand, mapUsernameToUserInfo, myUserInfo, events);
    }
  };
};
