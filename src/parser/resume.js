const { RESUME } = require('../commands');

function parseResumeCommand(command) {
  const event = command.slice(RESUME.length + 1);
  return {
    type: RESUME,
    event
  };
}

module.exports = { parseResumeCommand };
