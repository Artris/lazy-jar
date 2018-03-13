const {
    eventExists,
    mapUsernameToIDs
} = require('./helpers')
const {
    REMOVE
} = require('../commands');

function remove(parsedCommand, usernameToIds, myUserId, events) {
    const {
        event,
        usernames
    } = parsedCommand
    eventExists(event, events)
    return {
        type: REMOVE,
        event,
        userIds: mapUsernameToIDs(usernames, usernameToIds, myUserId)
    }
}

module.exports = {
    remove
}