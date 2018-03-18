const { eventExists } = require('./helpers');
const { TERMINATE } = require('../commands');

module.exports = require('./terminate.factory')(eventExists, TERMINATE);
