const customError = require('../../customError/customError')
/**
 * Checks if a given username exists in a map of usernames
 * @param {String} username
 * @param {Map([key,value])} usernameToIds
 */
function usernameExists(username, usernameToUserInfo) {
  const validUsername =
    username === 'me' || username === 'I' || usernameToUserInfo.has(username);
  if (!validUsername) throw new customError(`the user ${username} does not exist`, 'EA1000')
}

/**
 * Checks if a given event exists in a list of events
 * @param {String} event
 * @param {List[String]} events
 */
function eventExists(event, events) {
  if (!events.has(event)) throw new customError('the project specified does not exist', 'EA1001')
}

/**
 * Checks if an event is not in a list of events
 * @param {String} event
 * @param {List[String]} events
 */
function eventAlreadyExists(event, events) {
  if (events.has(event)) throw new customError(`the project ${event} already exists`, 'EA1002')
}

/**
 * Maps a list of usernames into a list of corresponding userIds
 * @param {List[String]} usernames
 * @param {Map([key,value])} usernameToUserInfo
 * @param {Number} myUserInfo
 * @return {List[Number]} list of userIds
 */
function mapUsernameToUserInfo(usernames, usernameToUserInfo, myUserInfo) {
  return usernames.map(username => {
    usernameExists(username, usernameToUserInfo);
    if (username === 'me' || username === 'I') return myUserInfo;
    return usernameToUserInfo.get(username);
  });
}

/**
 * Maps a string that specifies a time into an JSON object
 * @param {String} time
 * @param {String} zone
 * @return {Object} a JSON object representing the time
 */
function mapToTime(time, zone) {
  let hh = time.match(/\d\d?/);
  let mm = time.match(/:\d\d\s/);
  let amOrpm = time.match(/am|pm/);

  if (hh === null || amOrpm == null || mm === null)
    throw new customError('incorrectly formatted date', 'EA1003')

  amOrpm = amOrpm.shift();
  hh = Number(hh.shift());
  mm = Number(mm.shift().slice(1));

  if (!((hh >= 0) & (hh <= 24)) || !((mm >= 0) & (mm < 60)) || hh > 12)
    throw new customError('incorrectly formatted date', 'EA1004')

  hh = amOrpm === 'pm' && hh !== 12 ? (hh += 12) : hh;
  hh = amOrpm === 'am' && hh === 12 ? 0 : hh;
  return {
    hh: hh,
    mm: mm,
    zone
  };
}

/**
 * Maps a string that specifies a frequency into a keyword
 * @param {String} period
 * @return {String} frequency keyword
 */
function mapToFrequency(period) {
  const daysOfWeek = [
    'MONDAYS',
    'TUESDAYS',
    'WEDNESDAYS',
    'THURSDAYS',
    'FRIDAYS',
    'SATURDAYS',
    'SUNDAYS',
    'WEEKENDS'
  ];
  if (period.match(/week\s?day/i) || period.match(/work\s?day/))
    return 'WEEKDAYS';
  if (period.match(/every\s?day/i)) return 'EVERYDAY';
  let index = -1;
  daysOfWeek.forEach((day, i) => {
    const str = new RegExp(day.slice(0, -1), 'i');
    if (period.match(str)) index = i;
  });
  if (index <= -1) throw new customError('incorrect frequency', 'EA1005')
  return daysOfWeek[index]
}

/**
 * Maps a string that contains a number of days to a number e.g) '2 days' to 2
 * @param {String} period
 * @return {Number} number of days specified in parameter
 */
function mapPeriodtoDate(period, moment) {
  let years = period.match(/^(\d\d?\d?)\s(years?)$/);
  let months = period.match(/^(\d\d?\d?)\s(months?)$/);
  let weeks = period.match(/^(\d\d?\d?)\s(weeks?)$/);
  let days = period.match(/^(\d\d?\d?)\s(days?)$/);

  if (days !== null)
    return moment()
      .add(Number(days[1]), 'days')
      .format('DD-MM-YYYY');
  if (weeks !== null)
    return moment()
      .add(Number(weeks[1]), 'weeks')
      .format('DD-MM-YYYY');
  if (months !== null)
    return moment()
      .add(Number(months[1]), 'months')
      .format('DD-MM-YYYY');
  if (years !== null)
    return moment()
      .add(Number(years[1]), 'years')
      .format('DD-MM-YYYY');

  throw new customError('incorrect period', 'EA1006')
}

module.exports = {
  eventExists,
  eventAlreadyExists,
  mapUsernameToUserInfo,
  mapToFrequency,
  mapToTime,
  mapPeriodtoDate
};
