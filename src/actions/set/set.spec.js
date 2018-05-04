const assert = require('assert');
const set = require('./set');
const { SET } = require('../../commands');

describe('set action', function() {
  it('should correctly return set action given correct input', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const parsedCommand = {
      type: SET,
      who: 'artris',
      to: 'artris.com'
    }
    const expected = {
      type: SET,
      event: 'artris',
      url: 'artris.com'
    }
    const result = set(parsedCommand, events)
    assert.deepEqual(result, expected)
  })
  it('should throw an error given an event that does not exist', function() {
    const events = new Set(['lazy-jar']);
    const parsedCommand = {
      type: SET,
      who: 'artris',
      to: 'artris.com'
    }
    assert.throws(() => set(parsedCommand, events), /the project specified does not exist/)
  })
})
