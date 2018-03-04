const assert = require('assert');
const { parseCommand } = require('../../src/parser');
const {
  ADD,
  REMOVE,
  MOVE,
  PAID,
  SCHEDULE,
  SKIP,
  STATUS,
  HALT,
  TERMINATE
} = require('../../src/commands');

describe('parseCommand', function() {
  it('should parse a schedule command', function() {
    const message = 'schedule artris with @alireza.eva.u23 everyday at 6am';
    const expected = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@alireza.eva.u23'],
      when: 'everyday at 6am'
    };
    const result = parseCommand(message);
    assert.deepEqual(result, expected);
  });

  it('should parse add command', function() {
    const message = 'add @dtoki to artris';
    const expected = {
      type: ADD,
      to: 'artris',
      usernames: ['@dtoki']
    };
    const result = parseCommand(message);
    assert.deepEqual(result, expected);
  });

  it('should parse remove command', function() {
    const message = 'remove @dtoki from artris';
    const expected = {
      type: REMOVE,
      from: 'artris',
      usernames: ['@dtoki']
    };
    const result = parseCommand(message);
    assert.deepEqual(result, expected);
  });

  it('should parse move command', function() {
    const message = 'move artris to 10am';
    const expected = {
      type: MOVE,
      event: 'artris',
      to: '10am'
    };
    const result = parseCommand(message);
    assert.deepEqual(result, expected);
  });

  it('should parse status command', function() {
    const message = 'status';
    const expected = {
      type: STATUS
    };
    const result = parseCommand(message);
    assert.deepEqual(result, expected);
  });

  it('should parse halt command', function() {
    const message = 'halt artris';
    const expected = {
      type: HALT,
      event: 'artris'
    };
    const result = parseCommand(message);
    assert.deepEqual(result, expected);
  });

  it('should parse terminate command', function() {
    const message = 'terminate artris';
    const expected = {
      type: TERMINATE,
      event: 'artris'
    };
    const result = parseCommand(message);
    assert.deepEqual(result, expected);
  });

  it('should parse paid command', function() {
    const message = 'I paid @dtoki $10';
    const expected = {
      type: PAID,
      to: '@dtoki',
      who: 'I',
      some: '$10'
    };
    const result = parseCommand(message);
    assert.deepEqual(result, expected);
  });

  it('should parse skip command', function() {
    const message = 'I will skip artris for 2 months';
    const expected = {
      type: SKIP,
      username: 'I',
      name: 'artris',
      for: '2 months'
    };
    const result = parseCommand(message);
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
