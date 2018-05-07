const { eventExists, mapToFrequency, mapToTime } = require('../helpers/helpers');
const { MOVE } = require('../../commands');
const moment_tz = require('moment-timezone')

module.exports = require('./move.factory')(
  eventExists,
  mapToFrequency,
  mapToTime,
  MOVE
);
