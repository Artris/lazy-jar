const { split, parseTimeRange } = require('./helpers');

const HALT = 'HALT';

function parseHaltCommand(command) {
    const withoutPrefix = command.slice(HALT.length + 1);
    const [event, timeRange] = split(withoutPrefix, ' ');
    return {
        type: HALT,
        event,
        when: parseTimeRange(timeRange)
    };
}

module.exports = { parseHaltCommand, HALT };