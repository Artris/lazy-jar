function usernameExists(username, usernameToIds) {
    const validUsername = username === 'me' || username === 'I' || usernameToIds.has(username)
    if (!validUsername) throw Error(`the user ${username} does not exist`)
}

function eventExists(event, events) {
    if (!events.has(event)) throw Error('the project specified does not exist')
}

function eventAlreadyExists() {
    if (events.has(event)) throw Error(`the project ${event} already exists`)
}

function mapUsernameToIDs(usernames, usernameToIds, myUserID) {
    return usernames.map(username => {
        usernameExists(username, usernameToIds)
        if (username === 'me' || username === 'I') return myUserID;
        return usernameToIds.get(username)
    })
}

function mapToTime(time, zone) {
    let hh = time.match((/\d\d?/))
    let mm = time.match(/:\d\d/)
    let amOrpm = time.match(/am|pm/)

    if (hh === null) throw Error('the time specified is incorrect')

    amOrpm = (amOrpm !== null) ? amOrpm.shift() : null
    hh = Number(hh.shift())
    mm = (mm !== null) ? Number(mm.shift().slice(1)) : 0

    if (!(hh >= 0 & hh <= 24) || !(mm >= 0 & mm < 60) || (amOrpm === 'am' & hh > 12))
        throw Error('the time specified is incorrect')

    hh = (hh < 12 && amOrpm === 'pm') ? hh += 12 : hh
    hh = ((amOrpm === 'am' && hh === 12) || hh === 24) ? 0 : hh
    return {
        hh: JSON.stringify(hh),
        mm: JSON.stringify(mm),
        zone
    }
}

function mapToFrequency(period) {
    const daysOfWeek = ['MONDAYS', 'TUESDAYS', 'WEDNESDAYS', 'THURSDAYS', 'FRIDAYS', 'SATERDAYS', 'SUNDAYS', 'WEEKENDS']
    if (period.match(/week\s?day/i) || period.match(/work/)) return 'WEEKDAYS'
    if (period.match(/every\s?day/i)) return 'EVERYDAY'
    let index = -1
    daysOfWeek.forEach((day, i) => {
        const str = new RegExp(day.slice(0, -1), 'i')
        if (period.match(str)) index = i
    })
    if (index) return daysOfWeek[index]
    throw Error('please specify when you want the meetings to happen eg. WEEKDAYS, EVERYDAY ...')
}

module.exports = {
    eventExists,
    eventAlreadyExists,
    mapUsernameToIDs,
    mapToFrequency,
    mapToTime
}