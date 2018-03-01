const { splitBy, parseTimeRange } = require('./helpers');

const SKIP = 'SKIP';

function parseSkipCommand(command) {
  const withoutInfix = command.replace(' will skip ', ' ');
  const [username, name, timeRange] = splitBy(withoutInfix, [' ', ' ']);

  return {
    type: SKIP,
    when: parseTimeRange(timeRange),
    username,
    name
  };
}

module.exports = { parseSkipCommand, SKIP };
