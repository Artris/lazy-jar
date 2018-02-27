const assert = require('assert');
const { parseRemoveMessage } = require('../../parser/remove');

describe('parseRemoveMessage', function() {
  it('should split a valid remove command into action parameters', function() {
    const message = '@dtoki from artris';
    const expected = {
      type: 'remove',
      from: 'artris',
      username: '@dtoki'
    };
    const result = parseRemoveMessage(message, '@alireza.eva.u23');
    assert.deepEqual(result, expected);
  });

  it('should map "me" to the username', function() {
    const message = 'me from artris';
    const expected = {
      type: 'remove',
      from: 'artris',
      username: '@alireza.eva.u23'
    };
    const result = parseRemoveMessage(message, '@alireza.eva.u23');
    assert.deepEqual(result, expected);
  });
});
