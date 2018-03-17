module.exports = (split, splitUsernames, REMOVE) => {
  return (command, myUsername) => {
    const withoutPrefix = command.slice(REMOVE.length + 1);
    const [who, from] = split(withoutPrefix, ' from ');
    const usernames = splitUsernames(who);
    return {
      type: REMOVE,
      usernames,
      from
    };
  };
};
