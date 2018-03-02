const { split, parseTimeRange } = require('./helpers');

const HALT = 'HALT';

function parseHaltCommand(command) {
    const withoutPrefix = command.slice(HALT.length + 1);
    const [name, timeRange] = split(withoutPrefix, ' ');
    return {
        type: HALT,
        name,
        when: parseTimeRange(timeRange)
    };
}

module.exports = { parseHaltCommand, HALT };