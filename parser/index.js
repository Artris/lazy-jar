const { split } = require('./helpers');
const { parseScheduleMessage } = require('./schedule');
const { parseAddMessage } = require('./add');
const { parseRemoveMessage } = require('./remove');
const { parseSkipMessage } = require('./skip');
const { parsePaidMessage } = require('./paid');

function parseCommand(command, { myUsername }) {
  const [type, message] = split(command);
  switch (type) {
    case 'schedule':
      return parseScheduleMessage(message);
    case 'add':
      return parseAddMessage(message, myUsername);
    case 'remove':
      return parseRemoveMessage(message, myUsername);
    default:
      const isPaidCommand = command.indexOf(' paid ') !== -1;
      const isSkipCommand = command.indexOf(' will skip ') !== -1;
      if (isPaidCommand) return parsePaidMessage(command, myUsername);
      if (isSkipCommand) return parseSkipMessage(command, myUsername);
      throw Error('unkown command');
  }
}

module.exports = { parseCommand };
