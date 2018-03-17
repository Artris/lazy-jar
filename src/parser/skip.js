const { splitBy } = require('./helpers');
const { SKIP } = require('../commands');

module.exports = { parseSkipCommand: require('./skip.factory')(splitBy, SKIP) };
