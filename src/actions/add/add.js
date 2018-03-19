const { eventExists, mapUsernameToIDs } = require('../helpers/helpers');
const { ADD } = require('../../commands');

module.exports = require('./add.factory')(eventExists, mapUsernameToIDs, ADD);
