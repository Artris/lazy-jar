const assert = require('assert');
const { TERMINATE } = require('../../src/commands');
const { parseTerminateCommand } = require('../../src/parser/terminate');

describe('parseTerminateCommand', function() {
  it('should split a valid terminate command into action parameters', function() {
    const message = 'terminate artris';
    const expected = {
      type: TERMINATE,
      event: 'artris'
    };
    const result = parseTerminateCommand(message);
    assert.deepEqual(result, expected);
  });
});
