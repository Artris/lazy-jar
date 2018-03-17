const assert = require('assert');
const terminate = require('./terminate');
const { TERMINATE } = require('../commands');

describe('terminate action', function() {
  it('should correctly return terminate action', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const parsedCommand = {
      type: TERMINATE,
      event: 'artris'
    };
    const expected = {
      type: TERMINATE,
      event: 'artris'
    };
    const result = terminate(parsedCommand, events);
    assert.deepEqual(result, expected);
  });

  it('should correctly throw an error given an event that does not exist', function() {
    const events = new Set(['lazy-jar']);
    const parsedCommand = {
      type: TERMINATE,
      event: 'artris'
    };
    assert.throws(
      () => terminate(parsedCommand, events),
      /the project specified does not exist/
    );
  });
});
