const {
  eventExists,
  eventAlreadyExists,
  mapUsernameToIDs,
  mapToTime,
  mapToFrequency
} = require('./helpers');
const { SCHEDULE } = require('../commands');

module.exports = {
  schedule: require('./schedule.factory')(
    eventExists,
    eventAlreadyExists,
    mapUsernameToIDs,
    mapToTime,
    mapToFrequency,
    SCHEDULE
  )
};
