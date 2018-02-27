const { split } = require('./helpers');

function parseRemoveMessage(message, myUsername) {
  const [who, name] = split(message, 'from');
  return {
    type: 'remove',
    username: who === 'me' ? myUsername : who,
    from: name
  };
}

module.exports = { parseRemoveMessage };
