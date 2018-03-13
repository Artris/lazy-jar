const { RESUME } = require('../commands');
module.exports = { parseResumeCommand: require('./resume.factory')(RESUME) };
