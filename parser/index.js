const { split } = require('./helpers');
const { parseScheduleCommand } = require('./schedule');
const { parseAddCommand } = require('./add');
const { parseRemoveCommand } = require('./remove');
const { parseMoveCommand } = require('./move');
const { parseSkipCommand } = require('./skip');
const { parsePaidCommand } = require('./paid');
const { parseStatusCommand } = require('./status');

function parseCommand(command, { myUsername }) {
  const [type, message] = split(command);
  switch (type) {
    case 'schedule':
      return parseScheduleCommand(command);
    case 'move':
      return parseMoveCommand(command);
    case 'add':
      return parseAddCommand(command);
    case 'remove':
      return parseRemoveCommand(command);
    case 'status':
      return parseStatusCommand(command)
    default:
      const isPaidCommand = command.indexOf(' paid ') !== -1;
      const isSkipCommand = command.indexOf(' will skip ') !== -1;
      if (isPaidCommand) return parsePaidCommand(command);
      if (isSkipCommand) return parseSkipCommand(command, myUsername);
      throw Error('unkown command');
  }
}

module.exports = { parseCommand };
