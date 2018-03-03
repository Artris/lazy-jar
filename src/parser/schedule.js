const { split, splitAt, splitUsernames } = require('./helpers');
const { SCHEDULE } = require('../commands');

function parseScheduleCommand(command) {
  const withoutPrefix = command.slice(SCHEDULE.length + 1);
  const [event, whoWhen] = split(withoutPrefix, 'with');
  const [who, when] = splitAt(whoWhen, 'every');
  const usernames = splitUsernames(who);

  return {
    type: SCHEDULE,
    event,
    usernames,
    when
  };
}

module.exports = { parseScheduleCommand };
