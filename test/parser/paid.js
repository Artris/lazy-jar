const assert = require('assert');
const { parsePaidCommand, PAID } = require('../../parser/paid');

describe('parsePaidCommand', function() {
  it('should parse a valid paid command', function() {
    const message = '@dtoki paid me $2';
    const expected = {
      type: PAID,
      to: 'me',
      from: '@dtoki',
      some: '$2'
    };
    const result = parsePaidCommand(message);
    assert.deepEqual(result, expected);
  });
});
