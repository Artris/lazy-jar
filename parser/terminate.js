const { split } = require('./helpers');

const TERMINATE = 'TERMINATE'

function parseTerminateCommand(command) {
    const [type, name] = split(command)
    return {
        type: TERMINATE,
        name
    };
}

module.exports = { parseTerminateCommand,TERMINATE };