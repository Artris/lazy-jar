/**
 * Checks if a given username exists in a map of usernames
 * @param {String} username
 * @param {Map([key,value])} usernameToIds
 */
function usernameExists(username, usernameToIds) {
    const validUsername = username === 'me' || username === 'I' || usernameToIds.has(username)
    if (!validUsername) throw Error(`the user ${username} does not exist`)
}

/**
 * Checks if a given event exists in a list of events
 * @param {String} event
 * @param {List[String]} events
 */
function eventExists(event, events) {
    if (!events.has(event)) throw Error('the project specified does not exist')
}

/**
 * Checks if an event is not in a list of events
 * @param {String} event
 * @param {List[String]} events
 */
function eventAlreadyExists(event, events) {
    if (events.has(event)) throw Error(`the project ${event} already exists`)
}

/**
 * Maps a list of usernames into a list of corresponding userIds
 * @param {List[String]} usernames
 * @param {Map([key,value])} usernameToIds
 * @param {Number} myUserID
 * @return {List[Number]} list of userIds
 */
function mapUsernameToIDs(usernames, usernameToIds, myUserID) {
    return usernames.map(username => {
        usernameExists(username, usernameToIds)
        if (username === 'me' || username === 'I') return myUserID;
        return usernameToIds.get(username)
    })
}

/**
 * Maps a string that specifies a time into an JSON object 
 * @param {String} time
 * @param {String} zone
 * @return {Object} a JSON object representing the time 
 */
function mapToTime(time, zone) {
    let hh = time.match((/\d\d?/))
    let mm = time.match(/:\d\d\s/)
    let amOrpm = time.match(/am|pm/)

    if (hh === null || amOrpm == null || mm === null) throw Error('please specify a date in the format hh:mm am/pm')

    amOrpm = amOrpm.shift()
    hh = Number(hh.shift())
    mm = Number(mm.shift().slice(1))

    if (!(hh >= 0 & hh <= 24) || !(mm >= 0 & mm < 60) || (hh > 12))
        throw Error('please specify a date in the format hh:mm am/pm')

    hh = (amOrpm === 'pm' && hh !== 12) ? hh += 12 : hh
    hh = (amOrpm === 'am' && hh === 12) ? 0 : hh
    return {
        hh: hh,
        mm: mm,
        zone
    }
}

/**
 * Maps a string that specifies a frequency into a keyword
 * @param {String} period 
 * @return {String} frequency keyword 
 */
function mapToFrequency(period) {
    const daysOfWeek = ['MONDAYS', 'TUESDAYS', 'WEDNESDAYS', 'THURSDAYS', 'FRIDAYS', 'SATURDAYS', 'SUNDAYS', 'WEEKENDS']
    if (period.match(/week\s?day/i) || period.match(/work\s?day/)) return 'WEEKDAYS'
    if (period.match(/every\s?day/i)) return 'EVERYDAY'
    let index = -1
    daysOfWeek.forEach((day, i) => {
        const str = new RegExp(day.slice(0, -1), 'i')
        if (period.match(str)) index = i
    })
    if (index > -1) return daysOfWeek[index]
    throw Error('please specify when you want the meetings to happen eg. weekdays, everyday, Saturdays ...')
}

/**
 * Maps a string that contains a number of days to a number e.g) '2 days' to 2
 * @param {String} period 
 * @return {Number} number of days specified in parameter
 */
function mapPeriodtoDate(period, moment) {
    let years = period.match(/^(\d\d?\d?)\s(years?)$/)
    let months = period.match(/^(\d\d?\d?)\s(months?)$/)
    let weeks = period.match(/^(\d\d?\d?)\s(weeks?)$/)
    let days = period.match(/^(\d\d?\d?)\s(days?)$/)

    if (days !== null) return moment().add(Number(days[1]), 'days').format("DD-MM-YYYY");
    if (weeks !== null) return moment().add(Number(weeks[1]), 'weeks').format("DD-MM-YYYY");
    if (months !== null) return moment().add(Number(months[1]), 'months').format("DD-MM-YYYY");
    if (years !== null) return moment().add(Number(years[1]), 'years').format("DD-MM-YYYY");

    throw Error('please specify the period in days/months/years e.g ...for 2 days,')
}

module.exports = {
    eventExists,
    eventAlreadyExists,
    mapUsernameToIDs,
    mapToFrequency,
    mapToTime,
    mapPeriodtoDate
}