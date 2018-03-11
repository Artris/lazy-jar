/**
 * Checks if a given username exists in a map of usernames
 * @param {String} username
 * @param {Map([key,value])} mapOfUserNameToIds
 */
function usernameExists(username, usernameToIds) {
    const validUsername = username === 'me' || username === 'I' || usernameToIds.has(username)
    if (!validUsername) throw Error(`the user ${username} does not exist`)
}

/**
 * Checks if a given event exists in a list of events
 * @param {String} event name
 * @param {List[String]} mapOfUserNameToIds
 */
function eventExists(event, events) {
    if (!events.has(event)) throw Error('the project specified does not exist')
}

/**
 * Checks if an event is not in a list if events
 * @param {String} event name
 * @param {List[String]} list of events
 */
function eventAlreadyExists(event, events) {
    if (events.has(event)) throw Error(`the project ${event} already exists`)
}

/**
 * Maps a list of usernames into a list of corresponding userIds
 * @param {List[String]} usernames
 * @param {Map([key,value])} map of userId to username pairs
 * @return {List[Number]} list of mapped userIds
 */
function mapUsernameToIDs(usernames, usernameToIds, myUserID) {
    return usernames.map(username => {
        usernameExists(username, usernameToIds)
        if (username === 'me' || username === 'I') return myUserID;
        return usernameToIds.get(username)
    })
}

/**
 * Checks if 
 * @param {String} string containing time of event in format hh:mm am/pm
 * @param {String} the team's time zone 
 * @return {Object} an object representing the time 
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
 * Checks if 
 * @param {String} string containing the frequency of the event 
 * @return {String} keyword that describes the frequency 
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

module.exports = {
    eventExists,
    eventAlreadyExists,
    mapUsernameToIDs,
    mapToFrequency,
    mapToTime
}