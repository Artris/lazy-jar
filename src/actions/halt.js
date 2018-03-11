const {
    eventExists
} = require('./helpers')
const {
    HALT
} = require('../commands');

function halt(parsedCommand, events) {
    const {
        event
    } = parsedCommand
    eventExists(event, events)
    return {
        type: HALT,
        event
    }
}

module.exports = {
    halt
}