const { split } = require('./helpers');

function parseAddMessage(message, myUsername) {
  const [who, to] = split(message, ' to ');
  return {
    type: 'add',
    username: who === 'me' ? myUsername : who,
    to
  };
}

module.exports = { parseAddMessage };
