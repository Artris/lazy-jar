const { eventExists, mapUsernameToIDs } = require('../helpers/helpers');
const { START } = require('../../commands');

module.exports = require('./start.factory')(
  eventExists,
  mapUsernameToIDs,
  START
);