const assert = require('assert');
const { START } = require('../../commands');
const parseStartCommand = require('./start');

describe('parseStartCommand', function() {
  it('should split a valid start command into action parameters', function() {
    const message = 'start notifying @grace for artris';
    const expected = {
      type: START,
      username: '@grace',
      name: 'artris'
    };
    const result = parseStartCommand(message);
    assert.deepEqual(result, expected);
  });
});