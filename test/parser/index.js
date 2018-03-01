const assert = require('assert');
const { parseCommand } = require('../../parser');
const { ADD } = require('../../parser/add');
const { REMOVE } = require('../../parser/remove');
const { MOVE } = require('../../parser/move');
const { PAID } = require('../../parser/paid');
const { SCHEDULE } = require('../../parser/schedule');
const { SKIP } = require('../../parser/skip');
const { STATUS } = require('../../parser/status');
const { weekdays } = require('../../parser/constants');

describe('parseCommand', function() {
  it('should parse a schedule command', function() {
    const message = 'schedule artris with @alireza.eva.u23 everyday at 6am';
    const expected = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@alireza.eva.u23'],
      when: {
        time: '6am',
        weekdays: weekdays
      }
    };
    const result = parseCommand(message, { myUsername: '@alireza.eva.u23' });
    assert.deepEqual(result, expected);
  });

  it('should parse add command', function() {
    const message = 'add @dtoki to artris';
    const expected = {
      type: ADD,
      to: 'artris',
      usernames: ['@dtoki']
    };
    const result = parseCommand(message, { myUsername: '@alireza.eva.u23' });
    assert.deepEqual(result, expected);
  });

  it('should parse remove command', function() {
    const message = 'remove @dtoki from artris';
    const expected = {
      type: REMOVE,
      from: 'artris',
      usernames: ['@dtoki']
    };
    const result = parseCommand(message, { myUsername: '@alireza.eva.u23' });
    assert.deepEqual(result, expected);
  });

  it('should parse move command', function() {
    const message = 'move artris to 10am';
    const expected = {
      type: MOVE,
      event: 'artris',
      to: {
        time: '10am'
      }
    };
    const result = parseCommand(message, { myUsername: '@alireza.eva.u23' });
    assert.deepEqual(result, expected);
  });

  it('should parse status command', function() {
    const message = 'status';
    const expected = {
      type: STATUS
    };
    const result = parseCommand(message, { myUsername: '@alireza.eva.u23' });
    assert.deepEqual(result, expected);
  });

  it('should parse paid command', function() {
    const message = 'I paid @dtoki $10';
    const expected = {
      type: PAID,
      to: '@dtoki',
      from: 'I',
      some: '$10'
    };
    const result = parseCommand(message, { myUsername: '@alireza.eva.u23' });
    assert.deepEqual(result, expected);
  });

  it('should parse skip command', function() {
    const message = 'I will skip artris for 2 months';
    const expected = {
      type: SKIP,
      username: 'I',
      name: 'artris',
      when: {
        count: '2',
        period: 'month'
      }
    };
    const result = parseCommand(message, { myUsername: '@alireza.eva.u23' });
    assert.deepEqual(result, expected);
  });

  it('should throw if the command is unknown', function() {
    const message =
      'UnkownCommand artris with @alireza.eva.u23 everyday at 6am';
    assert.throws(() => {
      parseCommand(text, { myUsername: '@alireza.eva.u23' });
    }, 'unknown command');
  });
});
