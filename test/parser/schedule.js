const assert = require('assert');
const { parseScheduleCommand, SCHEDULE } = require('../../parser/schedule');
const { weekdays } = require('../../parser/constants');

describe('parseScheduleCommand', function() {
  it('should split a valid schedule command into action parameters', function() {
    const message =
      'schedule artris with @alireza.eva.u23, and me everyday at 6am';
    const expected = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@alireza.eva.u23', 'me'],
      when: {
        time: '6am',
        weekdays: weekdays
      }
    };
    const result = parseScheduleCommand(message);
    assert.deepEqual(result, expected);
  });
});
