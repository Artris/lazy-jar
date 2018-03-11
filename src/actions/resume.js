const {
    eventExists
} = require('./helpers')
const {
    RESUME
} = require('../commands');

function resume(parsedCommand, events) {
    const {
        event
    } = parsedCommand
    eventExists(event, events)
    return {
        type: RESUME,
        event
    }
}

module.exports = {
    resume
}