const {
    ADD,
    REMOVE,
    HALT,
    MOVE,
    RESUME,
    SCHEDULE,
    TERMINATE
} = require('../commands')

function lazyJar(state = {}, action) {
    const {
        event
    } = action
    switch (action.type) {
        case SCHEDULE:
            return Object.assign({}, state, {
                [event]: {
                    userIds: action.userIds,
                    frequency: action.frequency,
                    time: action.time,
                    halted: false
                }
            })
        case TERMINATE:
            const newState = Object.assign({}, state)
            delete newState[event]
            return newState
        case ADD:
        case REMOVE:
        case MOVE:
        case HALT:
        case RESUME:
            const {
                userIds,
                frequency,
                time,
                halted
            } = state[event]
            return Object.assign({}, state, {
                [event]: {
                    userIds: processUserIds(userIds, action),
                    frequency: processFrequency(frequency, action),
                    time: processTime(time, action),
                    halted: isHalted(halted, action)
                }
            })
        defualt:
            return state
    }
}

function processUserIds(prevUserIds, action) {
    switch (action.type) {
        case ADD:
            /*return new array of ids without duplicates*/
            return prevUserIds.concat(action.userIds).filter((id, index, arr) => {
                return arr.indexOf(id) === index
            })
        case REMOVE:
            return prevUserIds.filter(id => {
                return !action.userIds.includes(id)
            })
        default:
            return prevUserIds
    }
}

function processFrequency(prevFrequency, action) {
    switch (action.type) {
        case MOVE:
            return action.frequency
        default:
            return prevFrequency
    }
}

function processTime(prevTime = {}, action) {
    switch (action.type) {
        case MOVE:
            return action.time
        default:
            return prevTime
    }
}

function isHalted(halted = false, action) {
    switch (action.type) {
        case RESUME:
            return false
        case HALT:
            return true
        default:
            return halted
    }
}

module.exports = {
    lazyJar
}