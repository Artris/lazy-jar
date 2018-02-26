const assert = require('assert');
const { parseScheduleMessage } = require('../../parser/schedule');
const { weekdays } = require('../../parser/constants');

describe('parseScheduleMessage', function() {
  it('should split a valid schedule command into action parameters', function() {
    const message = 'artris with @alireza.eva.u23 everyday at 6am';
    const expected = {
      type: 'schedule',
      name: 'artris',
      usernames: ['@alireza.eva.u23'],
      when: {
        time: '6am',
        weekdays: weekdays
      }
    };
    const result = parseScheduleMessage(message);
    assert.deepEqual(result, expected);
  });
});
