const { split } = require('./helpers');
const { MOVE } = require('../commands');

function parseMoveCommand(command) {
  const withoutPrefix = command.slice(MOVE.length + 1);
  const [event, to] = split(withoutPrefix, ' to ');
  return {
    type: MOVE,
    event,
    to
  };
}

module.exports = { parseMoveCommand };
