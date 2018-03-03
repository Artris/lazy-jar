const { HALT } = require('../commands');

function parseHaltCommand(command) {
  const event = command.slice(HALT.length + 1);
  return {
    type: HALT,
    event
  };
}

module.exports = { parseHaltCommand };
