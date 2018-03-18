const { split } = require('./helpers');
const { TERMINATE } = require('../commands');

module.exports = require('./terminate.factory')(split, TERMINATE);
