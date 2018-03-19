const {
  eventExists,
  eventAlreadyExists,
  mapUsernameToIDs,
  mapToTime,
  mapToFrequency
} = require('../helpers/helpers');
const { SCHEDULE } = require('../../commands');

module.exports = require('./schedule.factory')(
  eventExists,
  eventAlreadyExists,
  mapUsernameToIDs,
  mapToTime,
  mapToFrequency,
  SCHEDULE
);
