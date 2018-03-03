const assert = require('assert');
const { PAID } = require('../../src/commands');
const { parsePaidCommand } = require('../../src/parser/paid');

describe('parsePaidCommand', function() {
  it('should parse a valid paid command', function() {
    const message = '@dtoki paid me $2';
    const expected = {
      who: '@dtoki',
      type: PAID,
      some: '$2',
      to: 'me'
    };
    const result = parsePaidCommand(message);
    assert.deepEqual(result, expected);
  });
});
