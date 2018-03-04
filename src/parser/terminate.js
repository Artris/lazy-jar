const { split } = require('./helpers');
const { TERMINATE } = require('../commands');

function parseTerminateCommand(command) {
  const [type, event] = split(command);
  return {
    type: TERMINATE,
    event
  };
}

module.exports = { parseTerminateCommand };
