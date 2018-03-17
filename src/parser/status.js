const { STATUS } = require('../commands');
module.exports = { parseStatusCommand: require('./status.factory')(STATUS) };
