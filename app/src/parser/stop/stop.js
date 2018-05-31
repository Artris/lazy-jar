const { splitBy } = require('../helpers/helpers');
const { STOP } = require('../../commands');

module.exports = require('./stop.factory')(splitBy, STOP);