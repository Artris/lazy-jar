const {
  eventExists,
  eventAlreadyExists,
  mapUsernameToUserInfo,
  mapToTime,
  mapToFrequency,
  timezoneExists
} = require('../helpers/helpers');
const { SCHEDULE } = require('../../commands');
const moment_tz = require('moment-timezone')

module.exports = require('./schedule.factory')(
  eventExists,
  eventAlreadyExists,
  mapUsernameToUserInfo,
  mapToTime,
  mapToFrequency,
  timezoneExists,
  SCHEDULE,
  moment_tz
);
