module.exports = (eventExists, RESUME) => {
  return (parsedCommand, events) => {
    const { event } = parsedCommand;
    eventExists(event, events);
    return {
      type: RESUME,
      event
    };
  };
};
