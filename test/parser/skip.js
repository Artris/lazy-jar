const assert = require('assert');
const { parseSkipMessage } = require('../../parser/skip');

describe('parseSkipMessage', function() {
  it('should split a valid skip command into action parameters', function() {
    const message = '@dtoki will skip artris for 2 days';
    const expected = {
      type: 'skip',
      when: {
        period: 'day',
        count: '2'
      },
      username: '@dtoki',
      name: 'artris'
    };
    const result = parseSkipMessage(message, '@alireza.eva.u23');
    assert.deepEqual(result, expected);
  });

  it('should map "I" to the username', function() {
    const message = 'I will skip artris for 2 days';
    const expected = {
      type: 'skip',
      when: {
        period: 'day',
        count: '2'
      },
      username: '@alireza.eva.u23',
      name: 'artris'
    };
    const result = parseSkipMessage(message, '@alireza.eva.u23');
    assert.deepEqual(result, expected);
  });
});
