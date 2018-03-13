const { eventExists } = require('./helpers');
const { RESUME } = require('../commands');

module.exports = {
  resume: require('./resume.factory')(eventExists, RESUME)
};
