const { eventExists } = require('./helpers');
const { TERMINATE } = require('../commands');

module.exports = {
  terminate: require('./terminate.factory')(eventExists, TERMINATE)
};
