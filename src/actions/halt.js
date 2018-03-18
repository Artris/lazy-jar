const { eventExists } = require('./helpers');
const { HALT } = require('../commands');

module.exports = require('./halt.factory')(eventExists, HALT);
