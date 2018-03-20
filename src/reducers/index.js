const {
    ADD,
    REMOVE,
    HALT,
    MOVE,
    RESUME,
    SCHEDULE,
    TERMINATE,
    SKIP,
    START,
    STOP
} = require('../commands')

function lazyJar(state = {}, action) {
    const {
        event
    } = action
    switch (action.type) {
        case SCHEDULE:
            return Object.assign({}, state, {
                event_id: event,
                time_to_respond: 900,
                members: action.userIds.map((user_id) => ({
                    user_id: user_id,
                    ignore: false
                })),
                frequency: action.frequency,
                time: action.time,
                halted: false
            })
        case TERMINATE:
            return {}
        case ADD:
        case REMOVE:
        case MOVE:
        case HALT:
        case RESUME:
        case SKIP:
        case START:
        case STOP:
            const {
                members,
                frequency,
                time,
                halted
            } = state

            return Object.assign({}, state, {
                event_id: event,
                time_to_respond: 900,
                members: processUserIds(members, action),
                frequency: processFrequency(frequency, action),
                time: processTime(time, action),
                halted: isHalted(halted, action)
            })
        default:
            return state
    }
}

function processUserIds(prevMembers, action) {
    switch (action.type) {
        case ADD:
            /*return new array of ids without duplicates*/
            return prevMembers.concat(action.userIds.map((id) => {
                return {
                    user_id: id,
                    ignore: false
                }
            })).filter((member, index, arr) => {
                return index === arr.findIndex(object => {
                    return object.user_id === member.user_id
                })
            })
        case REMOVE:
            return prevMembers.filter((member) => {
                return !action.userIds.includes(member.user_id)
            })
        case SKIP:
            return prevMembers.map(member => {
                return (member.user_id === action.userId) ? Object.assign({}, member, {
                    skip_until: action.skip_until
                }) : member
            })
        case START:
            return prevMembers.map(member => {
                return (member.user_id === action.userId) ? {
                    user_id: action.userId,
                    ignore: false
                } : member
            })
        case STOP:
            return prevMembers.map(member => {
                return (member.user_id === action.userId) ? Object.assign({}, member, {
                    ignore: true
                }) : member
            })
        default:
            return prevMembers
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