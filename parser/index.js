const { split } = require('./helpers');
const { parseScheduleMessage } = require('./schedule');

function parseCommand(command) {
  const [type, message] = split(command);
  switch (type) {
    case 'schedule':
      return parseScheduleMessage(message);
    default:
      return {};
  }
}

module.exports = { parseCommand };
