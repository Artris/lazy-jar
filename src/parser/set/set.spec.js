const assert = require('assert');
const { SET } = require('../../commands');
const parseSetCommand = require('./set');

describe('parseSetCommand', function() {
    it('should correctly split the set command into standup name and url', function() {
        const command = 'set url for artris to artris.com';
        const expected = {
            type: SET,
            who: 'artris',
            to: 'artris.com'
        };
        const result = parseSetCommand(command);
        assert.deepEqual(result, expected);
    });
});
