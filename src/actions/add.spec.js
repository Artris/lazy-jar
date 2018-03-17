const assert = require('assert');
const add = require('./add');
const { ADD } = require('../commands');

describe('add action', function() {
  it('should correctly return add action', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const usernameToIds = new Map([
      ['@dtoki', 0],
      ['@alireza.eva.u23', 1],
      ['@grace', 2]
    ]);
    const myUserID = 2;
    const parsedCommand = {
      type: ADD,
      to: 'artris',
      usernames: ['@dtoki', '@alireza.eva.u23', 'me']
    };
    const expected = {
      type: ADD,
      event: 'artris',
      userIds: [0, 1, 2]
    };
    const result = add(parsedCommand, usernameToIds, myUserID, events);
    assert.deepEqual(result, expected);
  });

  it('should throw an error given an event that does not exist', function() {
    const events = new Set(['lazy-jar']);
    const usernameToIds = new Map([
      ['@dtoki', 0],
      ['@alireza.eva.u23', 1],
      ['@grace', 2]
    ]);
    const myUserID = 2;
    const parsedCommand = {
      type: ADD,
      to: 'artris',
      usernames: ['@dtoki', '@alireza.eva.u23', 'me']
    };
    assert.throws(
      () => add(parsedCommand, usernameToIds, myUserID, events),
      /the project specified does not exist/
    );
  });

  it('should correctly throw an error given a username that does not exist', function() {
    const events = new Set(['lazy-jar']);
    const usernameToIds = new Map([['@dtoki', 0], ['@alireza.eva.u23', 1]]);
    const myUserID = 1;
    const parsedCommand = {
      type: ADD,
      to: 'lazy-jar',
      usernames: ['@dtoki', '@grace', 'me']
    };
    assert.throws(
      () => add(parsedCommand, usernameToIds, myUserID, events),
      /the user @grace does not exist/
    );
  });
});
