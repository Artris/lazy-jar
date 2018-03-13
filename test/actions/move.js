const assert = require('assert');
const {
    move
} = require('../../src/actions/move');
const {
    MOVE
} = require('../../src/commands');

describe('move action', function () {
    it('should correctly return a move action', function () {
        const events = new Set(['artris', 'lazy-jar'])
        const parsedCommand = {
            type: MOVE,
            event: 'artris',
            to: '6:30 am everyday'
        };
        const expected = {
            type: MOVE,
            event: 'artris',
            time: {
                hh: 6,
                mm: 30,
                zone: 'UTC'
            },
            frequency: 'EVERYDAY'
        };
        const result = move(parsedCommand, events);
        assert.deepEqual(result, expected);
    });

    it('should throw an error given incorrect time', function () {
        const events = new Set(['artris', 'lazy-jar'])
        const parsedCommand = {
            type: MOVE,
            event: 'artris',
            to: '6 everyday'
        };
        assert.throws(() => move(parsedCommand, events), /please specify a date in the format/)
    });

    it('should throw an error given incorrect frequency', function () {
        const events = new Set(['artris', 'lazy-jar'])
        const parsedCommand = {
            type: MOVE,
            event: 'artris',
            to: '6:00 am once in a while'
        };
        assert.throws(() => move(parsedCommand, events), /please specify when you want the meetings to happen eg. weekdays, everyday, Saturdays .../)
    });

    it('should throw an error given an event that does not exist', function () {
        const events = new Set(['lazy-jar'])
        const parsedCommand = {
            type: MOVE,
            event: 'artris',
            to: '6:00 am once in a while'
        };
        assert.throws(() => move(parsedCommand, events), /the project specified does not exist/)
    })
});