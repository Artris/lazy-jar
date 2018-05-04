const {
  eventExists,
} = require('../helpers/helpers');
const { SET } = require('../../commands');

module.exports = require('./set.factory')(
  eventExists,
  SET
);
