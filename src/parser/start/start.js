const { splitBy } = require('../helpers/helpers');
const { START } = require('../../commands');

module.exports = require('./start.factory')(splitBy, START);