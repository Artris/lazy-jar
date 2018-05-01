const {
  eventExists,
  eventAlreadyExists,
  mapUsernameToUserInfo,
  mapToTime,
  mapToFrequency,
} = require('../helpers/helpers');
const { SCHEDULE } = require('../../commands');
var moment_tz = require('moment-timezone');

module.exports = require('./schedule.factory')(
  eventExists,
  eventAlreadyExists,
  mapUsernameToUserInfo,
  mapToTime,
  mapToFrequency,
  SCHEDULE,
  moment_tz
);
