const { eventExists, mapUsernameToUserInfo } = require('../helpers/helpers');
const { START } = require('../../commands');

module.exports = require('./start.factory')(
  eventExists,
  mapUsernameToUserInfo,
  START
);
