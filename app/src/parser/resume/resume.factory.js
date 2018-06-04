module.exports = RESUME => {
  return command => {
    const event = command.slice(RESUME.length + 1);
    return {
      type: RESUME,
      event
    };
  };
};
