const assert = require('assert');
const { parseMoveCommand, MOVE } = require('../../parser/move');
const { workdays } = require('../../parser/constants');

describe('parseMoveCommand', function() {
  it('should split a valid move command into action parameters', function() {
    const message = 'move artris to 6am';
    const expected = {
      type: MOVE,
      event: 'artris',
      to: {
        time: '6am'
      }
    };
    const result = parseMoveCommand(message);
    assert.deepEqual(result, expected);
  });

  it('should handle change in week days', function() {
    const message = 'move artris to every workday at 6am';
    const expected = {
      type: MOVE,
      event: 'artris',
      to: {
        weekdays: workdays,
        time: '6am'
      }
    };
    const result = parseMoveCommand(message);
    assert.deepEqual(result, expected);
  });
});
