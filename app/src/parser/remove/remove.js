const { split, splitUsernames } = require('../helpers/helpers');
const { REMOVE } = require('../../commands');

module.exports = require('./remove.factory')(split, splitUsernames, REMOVE);
