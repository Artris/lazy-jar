const { eventExists } = require('../helpers/helpers');
const { TERMINATE } = require('../../commands');

module.exports = require('./terminate.factory')(eventExists, TERMINATE);
