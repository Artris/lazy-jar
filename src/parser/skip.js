const { splitBy } = require('./helpers');
const { SKIP } = require('../commands');

function parseSkipCommand(command) {
  const withoutInfix = command.replace(' will skip ', ' ');
  const [username, name, period] = splitBy(withoutInfix, [' ', 'for']);

  return {
    type: SKIP,
    for: period,
    username,
    name
  };
}

module.exports = { parseSkipCommand };
