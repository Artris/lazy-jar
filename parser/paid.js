const { splitBy } = require('./helpers');

const PAID = 'PAID';

function parsePaidCommand(command) {
  const withoutInfix = command.replace(' paid ', ' ');
  const [from, to, some] = splitBy(withoutInfix, [' ', ' ']);

  return {
    type: PAID,
    from,
    to,
    some
  };
}

module.exports = { parsePaidCommand, PAID };
