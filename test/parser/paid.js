const assert = require('assert');
const { parsePaidMessage } = require('../../parser/paid');

describe('parsePaidMessage', function() {
  it('should map me to the username', function() {
    const message = '@dtoki paid me $2';
    const expected = {
      type: 'paid',
      to: '@alireza.eva.u23',
      from: '@dtoki',
      some: '$2'
    };
    const result = parsePaidMessage(message, '@alireza.eva.u23');
    assert.deepEqual(result, expected);
  });

  it('should map "I" to the username', function() {
    const message = 'I paid @dtoki $2';
    const expected = {
      type: 'paid',
      from: '@alireza.eva.u23',
      to: '@dtoki',
      some: '$2'
    };
    const result = parsePaidMessage(message, '@alireza.eva.u23');
    assert.deepEqual(result, expected);
  });
});
