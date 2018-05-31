module.exports = (split, MOVE) => {
  return command => {
    const withoutPrefix = command.slice(MOVE.length + 1);
    const [event, to] = split(withoutPrefix, ' to ');
    return {
      type: MOVE,
      event,
      to
    };
  };
};
