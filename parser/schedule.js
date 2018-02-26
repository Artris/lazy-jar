const { parseTime, split } = require('./helpers');

function parseScheduleMessage(message) {
  const [name, rest] = split(message, 'with');
  const [participants, time] = split(rest, 'every');

  const when = parseTime(time);
  const usernames = participants.split(' ');

  return {
    type: 'schedule',
    name,
    usernames,
    when
  };
}

module.exports = { parseScheduleMessage };
