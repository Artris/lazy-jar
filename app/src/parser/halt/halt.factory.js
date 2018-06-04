module.exports = HALT => {
  return command => {
    const event = command.slice(HALT.length + 1);
    return {
      type: HALT,
      event
    };
  };
};
