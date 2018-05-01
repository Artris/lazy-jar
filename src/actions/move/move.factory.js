module.exports = (eventExists, mapToFrequency, mapToTime, MOVE, moment_tz) => {
  return (parsedCommand, events) => {
    const { event, to, zone} = parsedCommand;
    eventExists(event, events);
    return {
      type: MOVE,
      event,
      frequency: mapToFrequency(to),
      time: mapToTime(to, zone, moment_tz)
    };
  };
};
