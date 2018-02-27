const assert = require('assert');
const { parseAddMessage } = require('../../parser/add');

describe('parseAddMessage', function() {
  it('should split a valid add command into action parameters', function() {
    const message = '@dtoki to artris';
    const expected = {
      type: 'add',
      to: 'artris',
      username: '@dtoki'
    };
    const result = parseAddMessage(message, '@alireza.eva.u23');
    assert.deepEqual(result, expected);
  });

  it('should map "me" to the username', function() {
    const message = 'me to artris';
    const expected = {
      type: 'add',
      to: 'artris',
      username: '@alireza.eva.u23'
    };
    const result = parseAddMessage(message, '@alireza.eva.u23');
    assert.deepEqual(result, expected);
  });
});
