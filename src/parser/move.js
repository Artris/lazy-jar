const { split } = require('./helpers');
const { MOVE } = require('../commands');

module.exports = { parseMoveCommand: require('./move.factory')(split, MOVE) };
