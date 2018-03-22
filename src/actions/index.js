const add = require('./add/add');
const remove = require('./remove/remove');
const halt = require('./halt/halt');
const move = require('./move/move');
const resume = require('./resume/resume');
const schedule = require('./schedule/schedule');
const skip = require('./schedule/skip');
const status = require('./status/status');
const terminate = require('./terminate/terminate');
const {
  ADD,
  REMOVE,
  HALT,
  MOVE,
  RESUME,
  SCHEDULE,
  SKIP,
  STATUS,
  TERMINATE
} = require('../commands');

module.exports = require('./actions.factory')(
  add,
  remove,
  halt,
  move,
  resume,
  schedule,
  skip,
  status,
  terminate,
  ADD,
  REMOVE,
  HALT,
  MOVE,
  RESUME,
  SCHEDULE,
  SKIP,
  STATUS,
  TERMINATE
);
