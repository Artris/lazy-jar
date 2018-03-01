const assert = require('assert');
const { parseAddCommand, ADD } = require('../../parser/add');

describe('parseAddCommand', function() {
  it('should handle ",", "and", and "me" keywords', function() {
    const command = 'add @dtoki, @alireza.eva.u23, and me to artris';
    const expected = {
      type: ADD,
      to: 'artris',
      usernames: ['@dtoki', '@alireza.eva.u23', 'me']
    };
    const result = parseAddCommand(command);
    assert.deepEqual(result, expected);
  });
});
