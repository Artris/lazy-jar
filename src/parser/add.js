const { split, splitUsernames } = require('./helpers');
const { ADD } = require('../commands');

module.exports = {
  parseAddCommand: require('./add.factory')(split, splitUsernames, ADD)
};
