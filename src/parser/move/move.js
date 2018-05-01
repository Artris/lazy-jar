const { split, splitTimeAndTimezone } = require('../helpers/helpers');
const {
    MOVE
} = require('../../commands');

module.exports = require('./move.factory')(split, splitTimeAndTimezone, MOVE);