const { split } = require('./helpers');
const { parseScheduleMessage } = require('./schedule');
const { parseAddMessage } = require('./add');

function parseCommand(command, { myUsername }) {
  const [type, message] = split(command);
  switch (type) {
    case 'schedule':
      return parseScheduleMessage(message);
    case 'add':
      return parseAddMessage(message, myUsername);
    default:
      throw Error('unkown command');
  }
}

module.exports = { parseCommand };
