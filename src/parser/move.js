const { split } = require('./helpers');
const { MOVE } = require('../commands');

module.exports = require('./move.factory')(split, MOVE);
