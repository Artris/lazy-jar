const { split } = require('./helpers');
const { TERMINATE } = require('../commands');

module.exports = {
  parseTerminateCommand: require('./terminate.factory')(split, TERMINATE)
};
