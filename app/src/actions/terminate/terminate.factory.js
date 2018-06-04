module.exports = (eventExists, TERMINATE) => {
  return (parsedCommand, events) => {
    const { event } = parsedCommand;
    eventExists(event, events);
    return {
      type: TERMINATE,
      event
    };
  };
};
