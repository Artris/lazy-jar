const {
  eventExists,
  mapUsernameToUserInfo,
  mapPeriodtoDate
} = require('../helpers/helpers');
const moment = require('moment');
const { SKIP } = require('../../commands');

module.exports = require('./skip.factory')(
  eventExists,
  mapUsernameToUserInfo,
  mapPeriodtoDate,
  SKIP,
  moment
);
