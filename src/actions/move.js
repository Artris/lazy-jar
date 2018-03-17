const { eventExists, mapToFrequency, mapToTime } = require('./helpers');
const { MOVE } = require('../commands');

module.exports = {
  move: require('./move.factory')(eventExists, mapToFrequency, mapToTime, MOVE)
};
