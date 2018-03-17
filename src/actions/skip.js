const { eventExists, mapUsernameToIDs, mapPeriodtoDays } = require('./helpers');
const { SKIP } = require('../commands');

module.exports = {
  skip: require('./skip.factory')(
    eventExists,
    mapUsernameToIDs,
    mapPeriodtoDays,
    SKIP
  )
};
