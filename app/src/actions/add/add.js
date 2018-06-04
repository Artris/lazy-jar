const { eventExists, mapUsernameToUserInfo } = require('../helpers/helpers');
const { ADD } = require('../../commands');

module.exports = require('./add.factory')(
  eventExists,
  mapUsernameToUserInfo,
  ADD
);
