const { split, splitUsernames } = require('./helpers');
const { REMOVE } = require('../commands');

module.exports = {
  parseRemoveCommand: require('./remove.factory')(split, splitUsernames, REMOVE)
};
