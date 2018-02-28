const assert = require('assert');
const { parseMoveMessage } = require('../../parser/move');
const { workdays } = require('../../parser/constants');

describe('parseMoveMessage', function() {
  it('should split a valid move command into action parameters', function() {
    const message = 'artris to 6am';
    const expected = {
      type: 'move',
      name: 'artris',
      to: {
        time: '6am'
      }
    };
    const result = parseMoveMessage(message);
    assert.deepEqual(result, expected);
  });

  it('should handle change in week days', function() {
    const message = 'artris to every workday at 6am';
    const expected = {
      type: 'move',
      name: 'artris',
      to: {
        weekdays: workdays,
        time: '6am'
      }
    };
    const result = parseMoveMessage(message);
    assert.deepEqual(result, expected);
  });
});
