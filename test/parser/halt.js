const assert = require('assert');
const { HALT } = require('../../src/commands');
const { parseHaltCommand } = require('../../src/parser/halt');

describe('parseHaltCommand', function() {
  it('should split a valid halt command into action parameters', function() {
    const message = 'halt feelinglucky';
    const expected = {
      type: HALT,
      event: 'feelinglucky'
    };
    const result = parseHaltCommand(message);
    assert.deepEqual(result, expected);
  });
});
