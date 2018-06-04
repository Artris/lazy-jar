const { eventExists, mapUsernameToUserInfo } = require('../helpers/helpers');
const { REMOVE } = require('../../commands');

module.exports = require('./remove.factory')(
  eventExists,
  mapUsernameToUserInfo,
  REMOVE
);
