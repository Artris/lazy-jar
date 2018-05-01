module.exports = (split, splitTimeAndTimezone, MOVE) => {
  return command => {
    const withoutPrefix = command.slice(MOVE.length + 1);
    const [event, time] = split(withoutPrefix, ' to ');
    const [to, zone] = splitTimeAndTimezone(time)
    return {
      type: MOVE,
      event,
      to,
      zone
    };
  };
};