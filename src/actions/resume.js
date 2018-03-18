const { eventExists } = require('./helpers');
const { RESUME } = require('../commands');

module.exports = require('./resume.factory')(eventExists, RESUME);
