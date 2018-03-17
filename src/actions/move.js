const { eventExists, mapToFrequency, mapToTime } = require('./helpers');
const { MOVE } = require('../commands');

module.exports = require('./move.factory')(
  eventExists,
  mapToFrequency,
  mapToTime,
  MOVE
);
