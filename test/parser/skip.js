const assert = require('assert');
const { parseSkipCommand, SKIP } = require('../../parser/skip');

describe('parseSkipMessage', function() {
  it('should split a valid skip command into action parameters', function() {
    const message = '@dtoki will skip artris for 2 days';
    const expected = {
      type: SKIP,
      when: {
        period: 'day',
        count: '2'
      },
      username: '@dtoki',
      name: 'artris'
    };
    const result = parseSkipCommand(message);
    assert.deepEqual(result, expected);
  });
});
