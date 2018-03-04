const assert = require('assert');
const { MOVE } = require('../../src/commands');
const { parseMoveCommand } = require('../../src/parser/move');

describe('parseMoveCommand', function() {
  it('should split a valid move command into action parameters', function() {
    const message = 'move artris to 6am';
    const expected = {
      type: MOVE,
      event: 'artris',
      to: '6am'
    };
    const result = parseMoveCommand(message);
    assert.deepEqual(result, expected);
  });

  it('should handle change in week days', function() {
    const message = 'move artris to every workday at 6:30am';
    const expected = {
      type: MOVE,
      event: 'artris',
      to: 'every workday at 6:30am'
    };
    const result = parseMoveCommand(message);
    assert.deepEqual(result, expected);
  });
});
