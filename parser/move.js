const { parseTime, split } = require('./helpers');

const MOVE = 'MOVE';

function parseMoveCommand(command) {
  const withoutPrefix = command.slice(MOVE.length + 1);
  const [event, time] = split(withoutPrefix, ' to ');
  const to = parseTime(time);

  return {
    type: MOVE,
    event,
    to
  };
}

module.exports = { parseMoveCommand, MOVE };
