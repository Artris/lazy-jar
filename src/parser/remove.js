const { split, splitUsernames } = require('./helpers');
const { REMOVE } = require('../commands');

function parseRemoveCommand(command, myUsername) {
  const withoutPrefix = command.slice(REMOVE.length + 1);
  const [who, from] = split(withoutPrefix, ' from ');
  const usernames = splitUsernames(who);
  return {
    type: REMOVE,
    usernames,
    from
  };
}

module.exports = { parseRemoveCommand };
