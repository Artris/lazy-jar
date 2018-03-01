const { split } = require('./helpers');

const STATUS = 'status'

function parseStatusCommand(command) {
    return {
        type: STATUS,
    };
}

module.exports = { parseStatusCommand, STATUS };