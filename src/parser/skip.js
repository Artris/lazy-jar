const { splitBy } = require('./helpers');
const { SKIP } = require('../commands');

module.exports = require('./skip.factory')(splitBy, SKIP);
