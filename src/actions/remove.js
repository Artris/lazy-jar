const { eventExists, mapUsernameToIDs } = require('./helpers');
const { REMOVE } = require('../commands');

module.exports = require('./remove.factory')(
  eventExists,
  mapUsernameToIDs,
  REMOVE
);
