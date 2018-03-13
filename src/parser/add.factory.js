module.exports = (split, splitUsernames, ADD) => {
  return command => {
    const withoutPrefix = command.slice(ADD.length + 1);
    const [who, to] = split(withoutPrefix, ' to ');
    const usernames = splitUsernames(who);
    return {
      type: ADD,
      usernames,
      to
    };
  };
};
