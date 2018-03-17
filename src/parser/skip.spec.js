const assert = require('assert');
const { SKIP } = require('../commands');
const parseSkipCommand = require('./skip');

describe('parseSkipMessage', function() {
  it('should split a valid skip command into action parameters', function() {
    const message = '@dtoki will skip artris for 2 days';
    const expected = {
      type: SKIP,
      for: '2 days',
      username: '@dtoki',
      name: 'artris'
    };
    const result = parseSkipCommand(message);
    assert.deepEqual(result, expected);
  });
});
