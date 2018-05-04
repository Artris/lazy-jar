module.exports = (
  eventExists,
  SET
) => {
  return (parsedCommand, events) => {
    const { to, who } = parsedCommand;
    eventExists(who, events)
    return {
      type: SET,
      event: who,
      url: to
    };
  };
};
