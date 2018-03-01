const { split } = require('./helpers');

const ADD = 'ADD';

function parseAddCommand(command) {
  const withoutPrefix = command.slice(ADD.length + 1);
  const [who, to] = split(withoutPrefix, ' to ');
  const usernames = who
    .replace(/,/g, ' ')
    .replace(/and/g, ' ')
    .split(/\s+/);

  return {
    type: ADD,
    usernames,
    to
  };
}

module.exports = { parseAddCommand, ADD };
