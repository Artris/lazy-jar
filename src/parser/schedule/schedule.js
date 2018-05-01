const { split, splitAt, splitUsernames, splitTimeAndTimezone  } = require('../helpers/helpers');
const { SCHEDULE } = require('../../commands');

module.exports = require('./schedule.factory')(
  split,
  splitAt,
  splitUsernames,
  splitTimeAndTimezone,
  SCHEDULE
);
