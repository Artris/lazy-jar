const { add } = require('./add');
const { remove } = require('./remove');
const { halt } = require('./halt');
const { move } = require('./move');
const { resume } = require('./resume');
const { schedule} = require('./schedule');
const { skip } = require('./skip');
const { terminate } = require('./terminate');
const {
    ADD,
    REMOVE,
    HALT,
    MOVE,
    RESUME,
    SCHEDULE,
    SKIP,
    STATUS,
    TERMINATE
} = require('../../src/commands')

function createAction(parsedCommand, usernameToIds, myUserID, events, zone) {
    switch(parsedCommand.type) {
        case ADD:
            return add(parsedCommand, usernameToIds, myUserID, events)
        case REMOVE:
            return remove(parsedCommand, usernameToIds, myUserID, events)
        case HALT:
            return halt(parsedCommand, events)
        case MOVE:
            return move(parsedCommand, events)
        case RESUME:
            return resume(parsedCommand, events)
        case SCHEDULE:
            return schedule(parsedCommand, usernameToIds, myUserID, events)
        case SKIP:
            return skip(parsedCommand, usernameToIds, myUserID, events)
        case STATUS:
            return {type: STATUS}
        case TERMINATE:
            return terminate(parsedCommand, events)
    }
}

module.exports = { createAction }
