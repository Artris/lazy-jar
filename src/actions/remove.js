const { eventExists, mapUsernameToIDs } = require('./helpers');
const { REMOVE } = require('../commands');

module.exports = {
  remove: require('./remove.factory')(eventExists, mapUsernameToIDs, REMOVE)
};
