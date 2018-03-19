const { eventExists } = require('../helpers/helpers');
const { HALT } = require('../../commands');

module.exports = require('./halt.factory')(eventExists, HALT);
