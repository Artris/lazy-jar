const { split } = require('./helpers');
const { parseScheduleCommand } = require('./schedule');
const { parseAddCommand } = require('./add');
const { parseRemoveCommand } = require('./remove');
const { parseMoveCommand } = require('./move');
const { parseSkipCommand } = require('./skip');
const { parseStatusCommand } = require('./status');
const { parseHaltCommand } = require('./halt');
const { parseResumeCommand } = require('./resume');
const { parseTerminateCommand } = require('./terminate');

module.exports = {
  parseCommand: require('./parser.factory')(
    split,
    parseScheduleCommand,
    parseAddCommand,
    parseRemoveCommand,
    parseMoveCommand,
    parseSkipCommand,
    parseStatusCommand,
    parseHaltCommand,
    parseResumeCommand,
    parseTerminateCommand
  )
};
