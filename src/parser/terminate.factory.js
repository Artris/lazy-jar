module.exports = (split, TERMINATE) => {
  return command => {
    const [type, event] = split(command);
    return {
      type: TERMINATE,
      event
    };
  };
};
