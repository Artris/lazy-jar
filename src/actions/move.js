const {
    eventExists,
    mapToFrequency,
    mapToTime
} = require('./helpers')
const {
    MOVE
} = require('../commands');

function move(parsedCommand, events, zone = 'UTC') {
    const {
        event,
        to
    } = parsedCommand
    eventExists(event, events)
    return {
        type: MOVE,
        event,
        frequency: mapToFrequency(to),
        time: mapToTime(to, zone)
    }
}

module.exports = {
    move
}