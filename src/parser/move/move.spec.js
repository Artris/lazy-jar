const assert = require('assert');
const { MOVE } = require('../../commands');
const parseMoveCommand = require('./move');

describe('parseMoveCommand', function() {
  it('should split a valid move command into action parameters', function() {
    const message = 'move artris to 6am UTC';
    const expected = {
      type: MOVE,
      event: 'artris',
      to: '6am',
      zone: 'UTC'
    };
    const result = parseMoveCommand(message);
    assert.deepEqual(result, expected);
  });

  it('should handle change in week days', function() {
    const message = 'move artris to every workday at 6:30am UTC';
    const expected = {
      type: MOVE,
      event: 'artris',
      to: 'every workday at 6:30am',
      zone: 'UTC'
    };
    const result = parseMoveCommand(message);
    assert.deepEqual(result, expected);
  });
});
