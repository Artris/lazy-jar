const { split } = require('../helpers/helpers');
const { SET } = require('../../commands');

module.exports = require('./set.factory')(split, SET);
