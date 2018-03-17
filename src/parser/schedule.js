const { split, splitAt, splitUsernames } = require('./helpers');
const { SCHEDULE } = require('../commands');

module.exports = {
  parseScheduleCommand: require('./schedule.factory')(
    split,
    splitAt,
    splitUsernames,
    SCHEDULE
  )
};
