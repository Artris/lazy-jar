const { HALT } = require('../commands');
module.exports = { parseHaltCommand: require('./halt.factory')(HALT) };
