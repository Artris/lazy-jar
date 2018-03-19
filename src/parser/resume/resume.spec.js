const assert = require('assert');
const { RESUME } = require('../../commands');
const parseResumeCommand = require('./resume');

describe('parseResumeCommand', function() {
  it('should split a valid resume command into action parameters', function() {
    const message = 'resume feelinglucky';
    const expected = {
      type: RESUME,
      event: 'feelinglucky'
    };
    const result = parseResumeCommand(message);
    assert.deepEqual(result, expected);
  });
});
