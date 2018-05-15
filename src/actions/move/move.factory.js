module.exports = (eventExists, mapToFrequency, mapToTime, MOVE) => {
  return (parsedCommand, events) => {
    const { event, to } = parsedCommand;
    eventExists(event, events);
    return {
      type: MOVE,
      event,
      frequency: mapToFrequency(to),
      time: mapToTime(to)
    };
  };
};
