const {
  eventExists,
  mapUsernameToUserInfo,
  mapPeriodtoDate
} = require('../helpers/helpers');
const { SKIP } = require('../../commands');

module.exports = require('./skip.factory')(
  eventExists,
  mapUsernameToUserInfo,
  mapPeriodtoDate,
  SKIP
);
