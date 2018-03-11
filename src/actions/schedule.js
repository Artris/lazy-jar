const {
    eventExists,
    eventAlreadyExists,
    mapUsernameToIDs,
    mapToTime,
    mapToFrequency
} = require('./helpers')
const {
    SCHEDULE
} = require('../commands');

function schedule(parsedCommand, usernameToIds, myUserID, events, zone = 'UTC') {
    const {
        event,
        usernames,
        when
    } = parsedCommand
    eventAlreadyExists(event, events)
    return {
        type: SCHEDULE,
        event,
        userIds: mapUsernameToIDs(usernames, usernameToIds, myUserID),
        time: mapToTime(when, zone),
        frequency: mapToFrequency(when)
    }
}

module.exports = {
    schedule
}