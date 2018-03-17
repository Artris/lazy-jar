const { eventExists, mapUsernameToIDs } = require('./helpers');
const { ADD } = require('../commands');

module.exports = {
  add: require('./add.factory')(eventExists, mapUsernameToIDs, ADD)
};
