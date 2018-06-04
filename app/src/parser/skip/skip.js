const { splitBy } = require('../helpers/helpers');
const { SKIP } = require('../../commands');

module.exports = require('./skip.factory')(splitBy, SKIP);
