const { STATUS } = require('../commands');

function parseStatusCommand(command) {
  return { type: STATUS };
}

module.exports = { parseStatusCommand };
