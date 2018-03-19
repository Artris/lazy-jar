const { split, splitUsernames } = require('../helpers/helpers');
const { ADD } = require('../../commands');

module.exports = require('./add.factory')(split, splitUsernames, ADD);
