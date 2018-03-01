const assert = require('assert');
const { parseStatusCommand, STATUS } = require('../../parser/status');

describe('parseStatusCommand', function () {
    it('should split valid status command in action parameters', function () {
        const command = 'status';
        const expected = {
            type: STATUS,
        };
        const result = parseStatusCommand(command);
        assert.deepEqual(result, expected);
    });
});




