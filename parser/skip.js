const { splitBy, parseTimeRange } = require('./helpers');

function parseSkipMessage(command, myUsername) {
  const withoutInfix = command.replace(' will skip ', ' ');
  const [who, name, timeRange] = splitBy(withoutInfix, [' ', ' ']);

  return {
    type: 'skip',
    when: parseTimeRange(timeRange),
    username: who === 'I' ? myUsername : who,
    name
  };
}

module.exports = { parseSkipMessage };
