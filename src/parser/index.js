const { split } = require('./helpers/helpers');
const parseScheduleCommand = require('./schedule/schedule');
const parseAddCommand = require('./add/add');
const parseRemoveCommand = require('./remove/remove');
const parseMoveCommand = require('./move/move');
const parseSkipCommand = require('./skip/skip');
const parseHaltCommand = require('./halt/halt');
const parseResumeCommand = require('./resume/resume');
const parseTerminateCommand = require('./terminate/terminate');
const parseStartCommand = require('./start/start');
const parseStopCommand = require('./stop/stop');

module.exports = require('./parser.factory')(
  split,
  parseScheduleCommand,
  parseAddCommand,
  parseRemoveCommand,
  parseMoveCommand,
  parseSkipCommand,
  parseHaltCommand,
  parseResumeCommand,
  parseTerminateCommand,
  parseStartCommand,
  parseStopCommand
);
