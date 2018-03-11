const {
    eventExists,
    mapUsernameToIDs
} = require('./helpers')
const {
    ADD
} = require('../commands');

function add(parsedCommand, usernameToIds, myUserID, events) {
    const {
        to,
        usernames
    } = parsedCommand
    eventExists(to, events)
    return {
        type: ADD,
        event: to,
        userIds: mapUsernameToIDs(usernames, usernameToIds, myUserID)
    }
    mapUsernameToIDs(usernames, usernameToIds)
}

module.exports = {
    add
}