const assert = require('assert');
const {
    halt
} = require('../../src/actions/halt');
const {
    HALT
} = require('../../src/commands');

describe('halt action', function () {
    it('should correctly return halt action', function () {
        const events = new Set(['artris', 'lazy-jar'])
        const parsedCommand = {
            type: HALT,
            event: 'artris',
        };
        const expected = {
            type: HALT,
            event: 'artris',
        };
        const result = halt(parsedCommand, events);
        assert.deepEqual(result, expected);
    });

    it('should throw an error given an event that does not exist', function () {
        const events = new Set(['lazy-jar'])
        const parsedCommand = {
            type: HALT,
            event: 'artris',
        };
        assert.throws(() => halt(parsedCommand, events), Error)
    });
});