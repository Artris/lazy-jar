const {
    eventExists,
    mapUsernameToIDs,
    mapPeriodtoDays
} = require('./helpers')
const {
    SKIP
} = require('../commands');

function skip(parsedCommand, usernameToIds, myUserID, events) {
    const {
        event,
        username,
        name
    } = parsedCommand
    eventExists(name, events)
    return {
        type: SKIP,
        event: name,
        userId: mapUsernameToIDs([username], usernameToIds, myUserID).pop(),
        days: mapPeriodtoDays(parsedCommand.for)
    }
}

module.exports = {
    skip
}