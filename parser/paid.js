const { splitBy } = require('./helpers');

function parsePaidMessage(command, myUsername) {
  const withoutInfix = command.replace(' paid ', ' ');
  const [from, to, some] = splitBy(withoutInfix, [' ', ' ']);

  return {
    type: 'paid',
    from: from === 'I' ? myUsername : from,
    to: to === 'me' ? myUsername : to,
    some
  };
}

module.exports = { parsePaidMessage };
