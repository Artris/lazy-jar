module.exports = (eventExists, HALT) => {
  return (parsedCommand, events) => {
    const { event } = parsedCommand;
    eventExists(event, events);
    return {
      type: HALT,
      event
    };
  };
};
