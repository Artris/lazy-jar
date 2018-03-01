const { parseTime, split } = require('./helpers');

function parseMoveMessage(message) {
  const [name, time] = split(message, ' to ');
  const to = parseTime(time);

  return {
    type: 'move',
    name,
    to
  };
}

module.exports = { parseMoveMessage };
