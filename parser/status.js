const STATUS = 'STATUS'

function parseStatusCommand(command) {
    return {
        type: STATUS
    };
}

module.exports = { parseStatusCommand, STATUS };