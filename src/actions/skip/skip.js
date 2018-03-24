const { eventExists, mapUsernameToIDs, mapPeriodtoDate } = require('../helpers/helpers');
const moment = require('moment');
const { SKIP } = require('../../commands');

module.exports = require('./skip.factory')(
  eventExists,
  mapUsernameToIDs,
  mapPeriodtoDate,
  SKIP,
  moment
);
