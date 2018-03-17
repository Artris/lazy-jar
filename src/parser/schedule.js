const { split, splitAt, splitUsernames } = require('./helpers');
const { SCHEDULE } = require('../commands');

module.exports = require('./schedule.factory')(
  split,
  splitAt,
  splitUsernames,
  SCHEDULE
);
