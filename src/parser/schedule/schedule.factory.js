module.exports = (split, splitAt, splitUsernames, splitTimeAndTimezone, SCHEDULE) => {
  return command => {
    const withoutPrefix = command.slice(SCHEDULE.length + 1);
    const [event, whoWhen] = split(withoutPrefix, 'with');
    const [who, time] = splitAt(whoWhen, 'every');
    const usernames = splitUsernames(who);
    const [when, zone] = splitTimeAndTimezone(time)
    return {
      type: SCHEDULE,
      event,
      usernames,
      when,
      zone
    };
  };
};