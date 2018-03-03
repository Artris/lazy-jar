const { splitBy } = require('./helpers');
const { PAID } = require('../commands');

function parsePaidCommand(command) {
  const withoutInfix = command.replace(' paid ', ' ');
  const [who, to, some] = splitBy(withoutInfix, [' ', ' ']);

  return {
    type: PAID,
    who,
    to,
    some
  };
}

module.exports = { parsePaidCommand };
