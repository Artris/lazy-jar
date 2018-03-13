const { eventExists } = require('./helpers');
const { HALT } = require('../commands');

module.exports = {
  halt: require('./halt.factory')(eventExists, HALT)
};
