const { parseTime, splitBy } = require('./helpers');

function parseScheduleMessage(message) {
  const [name, participants, time] = splitBy(message, ['with', 'every']);
  const usernames = participants.split(' ');
  const when = parseTime(time);

  return {
    type: 'schedule',
    name,
    usernames,
    when
  };
}

module.exports = { parseScheduleMessage };
