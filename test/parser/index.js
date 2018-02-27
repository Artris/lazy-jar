const assert = require('assert');
const { parseCommand } = require('../../parser');
const { weekdays } = require('../../parser/constants');

describe('parseCommand', function() {
  it('should parse a schedule command', function() {
    const message = 'schedule artris with @alireza.eva.u23 everyday at 6am';
    const expected = {
      type: 'schedule',
      name: 'artris',
      usernames: ['@alireza.eva.u23'],
      when: {
        time: '6am',
        weekdays: weekdays
      }
    };
    const result = parseCommand(message, { myUsername: '@alireza.eva.u23' });
    assert.deepEqual(result, expected);
  });

  it('should return an empty Object if the command is unknown', function() {
    const message =
      'UnkownCommand artris with @alireza.eva.u23 everyday at 6am';
    assert.throws(() => {
      parseCommand(text, { myUsername: '@alireza.eva.u23' });
    }, 'unknown command');
  });
});
