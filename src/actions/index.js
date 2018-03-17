const add = require('./add');
const remove = require('./remove');
const halt = require('./halt');
const move = require('./move');
const resume = require('./resume');
const schedule = require('./schedule');
const skip = require('./skip');
const terminate = require('./terminate');
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
} = require('../../src/commands');

module.exports = require('./actions.factory')(
  add,
  remove,
  halt,
  move,
  resume,
  schedule,
  skip,
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
