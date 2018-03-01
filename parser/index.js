const { split } = require('./helpers');
const { parseScheduleCommand } = require('./schedule');
const { parseAddCommand } = require('./add');
const { parseRemoveCommand } = require('./remove');
const { parseMoveCommand } = require('./move');
const { parseSkipCommand } = require('./skip');
const { parsePaidCommand } = require('./paid');
const { parseStatusCommand } = require('./status');
const { parseHaltCommand } = require('./halt');


function parseCommand(command, { myUsername }) {
  const isStatusCommand = command.indexOf('status') !== -1;
  if (isStatusCommand) return parseStatusCommand(command);

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
    case 'halt':
      return parseHaltCommand(command)
    default:
      const isPaidCommand = command.indexOf(' paid ') !== -1;
      const isSkipCommand = command.indexOf(' will skip ') !== -1;
      if (isPaidCommand) return parsePaidCommand(command);
      if (isSkipCommand) return parseSkipCommand(command, myUsername);
      throw Error('unkown command');
  }
}

module.exports = { parseCommand };
