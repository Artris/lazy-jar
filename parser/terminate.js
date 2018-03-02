const { split } = require('./helpers');

const TERMINATE = 'TERMINATE'

function parseTerminateCommand(command) {
    const [type, event] = split(command)
    return {
        type: TERMINATE,
        event
    };
}

module.exports = { parseTerminateCommand,TERMINATE };