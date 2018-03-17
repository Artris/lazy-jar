const { split, splitUsernames } = require('./helpers');
const { REMOVE } = require('../commands');

module.exports = require('./remove.factory')(split, splitUsernames, REMOVE);
