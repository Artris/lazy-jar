const { eventExists, mapUsernameToIDs } = require('../helpers/helpers');
const { STOP } = require('../../commands');

module.exports = require('./stop.factory')(
  eventExists,
  mapUsernameToIDs,
  STOP
);