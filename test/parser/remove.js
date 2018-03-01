const assert = require('assert');
const { parseRemoveCommand, REMOVE } = require('../../parser/remove');

describe('parseRemoveCommand', function() {
  it('should handle ",", "and", and "me" keywords', function() {
    const command = 'remove @dtoki, @alireza.eva.u23, and me from artris';
    const expected = {
      type: REMOVE,
      from: 'artris',
      usernames: ['@dtoki', '@alireza.eva.u23', 'me']
    };
    const result = parseRemoveCommand(command);
    assert.deepEqual(result, expected);
  });
});
