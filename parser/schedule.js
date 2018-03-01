const { parseTime, splitBy } = require('./helpers');

const SCHEDULE = 'SCHEDULE';

function parseScheduleCommand(command) {
  const withoutPrefix = command.slice(SCHEDULE.length + 1);
  const [event, who, time] = splitBy(withoutPrefix, ['with', 'every']);
  const usernames = who
    .replace(/,/g, ' ')
    .replace(/and/g, ' ')
    .split(/\s+/);
  const when = parseTime(time);

  return {
    type: SCHEDULE,
    event,
    usernames,
    when
  };
}

module.exports = { parseScheduleCommand, SCHEDULE };
