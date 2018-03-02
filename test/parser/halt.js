const assert = require('assert');
const { parseHaltCommand,HALT } = require('../../parser/halt');

describe('parseHaltCommand', function () {
    it('should split a valid halt command into action parameters', function () {
        const message = 'halt feelinglucky for 2 months';
        const expected = {
            type: HALT,
            event: 'feelinglucky',
            when: {
                period: 'month',
                count: '2'
            }
        };
        const result = parseHaltCommand(message);
        assert.deepEqual(result, expected);
    });
});