const {
    eventExists
} = require('./helpers')
const {
    TERMINATE
} = require('../commands');

function terminate(parsedCommand, events) {
    const { event } = parsedCommand
    eventExists(event, events)
    return {
        type: TERMINATE,
        event
    }
}

module.exports = {
    terminate
}