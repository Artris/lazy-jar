const assert = require('assert');
const { STATUS } = require('../../src/commands');
const { parseStatusCommand } = require('../../src/parser/status');

describe('parseStatusCommand', function() {
  it('should split valid status command', function() {
    const command = 'status';
    const expected = {
      type: STATUS
    };
    const result = parseStatusCommand(command);
    assert.deepEqual(result, expected);
  });
});
