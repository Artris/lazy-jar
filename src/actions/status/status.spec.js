const assert = require('assert');
const status = require('./status');
const { STATUS } = require('../../commands');

describe('status action', function(){
    it('should show status logs for standup',function(){
        const results = status('')
        const expected = {
            type: STATUS
        };
        assert.deepEqual(results,expected);
    });
});