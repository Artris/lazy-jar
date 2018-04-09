const { eventExists, mapUsernameToUserInfo } = require('../helpers/helpers');
const { STOP } = require('../../commands');

module.exports = require('./stop.factory')(
  eventExists,
  mapUsernameToUserInfo,
  STOP
);
