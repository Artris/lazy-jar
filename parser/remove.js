const { split } = require('./helpers');

const REMOVE = 'REMOVE';

function parseRemoveCommand(command, myUsername) {
  const withoutPrefix = command.slice(REMOVE.length + 1);
  const [who, from] = split(withoutPrefix, ' from ');
  const usernames = who
    .replace(/,/g, ' ')
    .replace(/and/g, ' ')
    .split(/\s+/);

  return {
    type: REMOVE,
    usernames,
    from
  };
}

module.exports = { parseRemoveCommand, REMOVE };
