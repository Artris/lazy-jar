const assert = require('assert');
const { SCHEDULE } = require('../commands');
const { parseScheduleCommand } = require('./schedule');

describe('parseScheduleCommand', function() {
  it('should split a valid schedule command into action parameters', function() {
    const message =
      'schedule artris with @alireza.eva.u23, and me everyday at 6am';
    const expected = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@alireza.eva.u23', 'me'],
      when: 'everyday at 6am'
    };
    const result = parseScheduleCommand(message);
    assert.deepEqual(result, expected);
  });
});
