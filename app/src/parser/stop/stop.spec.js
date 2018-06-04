const assert = require('assert');
const { STOP } = require('../../commands');
const parseStopCommand = require('./stop');

describe('parseStopCommand', function() {
  it('should split a valid stop command into action parameters', function() {
    const message = 'stop notifying @grace for artris';
    const expected = {
      type: STOP,
      username: '@grace',
      name: 'artris'
    };
    const result = parseStopCommand(message);
    assert.deepEqual(result, expected);
  });
});