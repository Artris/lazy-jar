module.exports = (
  add,
  remove,
  halt,
  move,
  resume,
  schedule,
  skip,
  terminate,
  ADD,
  REMOVE,
  HALT,
  MOVE,
  RESUME,
  SCHEDULE,
  SKIP,
  STATUS,
  TERMINATE
) => {
  return (parsedCommand, usernameToIds, myUserID, events, zone) => {
    switch (parsedCommand.type) {
      case ADD:
        return add(parsedCommand, usernameToIds, myUserID, events);
      case REMOVE:
        return remove(parsedCommand, usernameToIds, myUserID, events);
      case HALT:
        return halt(parsedCommand, events);
      case MOVE:
        return move(parsedCommand, events, zone);
      case RESUME:
        return resume(parsedCommand, events);
      case SCHEDULE:
        return schedule(parsedCommand, usernameToIds, myUserID, events, zone);
      case SKIP:
        return skip(parsedCommand, usernameToIds, myUserID, events);
      case STATUS:
        return { type: STATUS };
      case TERMINATE:
        return terminate(parsedCommand, events);
    }
  };
};
