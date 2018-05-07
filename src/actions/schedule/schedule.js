const {
  eventExists,
  eventAlreadyExists,
  mapUsernameToUserInfo,
  mapToTime,
  mapToFrequency
} = require('../helpers/helpers');
const { SCHEDULE } = require('../../commands');


module.exports = require('./schedule.factory')(
  eventExists,
  eventAlreadyExists,
  mapUsernameToUserInfo,
  mapToTime,
  mapToFrequency,
  SCHEDULE
);
