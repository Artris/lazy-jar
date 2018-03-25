const assert = require('assert');
const start = require('./start');
const {
  START
} = require('../../commands');

describe('start action', function () {
  it('should correctly return start action given correct input', function () {
    const events = new Set(['artris', 'lazy-jar']);
    const myUserId = 2;
    const usernameToIds = new Map([
      ['@dtoki', 0],
      ['@alireza.eva.u23', 1],
      ['@grace', 2]
    ]);
    const parsedCommand = {
      type: START,
      name: 'artris',
      username: 'me'
    };
    const expected = {
      type: START,
      event: 'artris',
      userId : 2
    };
    const result = start(parsedCommand, usernameToIds, myUserId, events);
    assert.deepEqual(result, expected);
  });

  it('should throw an error given a username that does not exist', function () {
    const events = new Set(['artris', 'lazy-jar']);
    const usernameToIds = new Map([
      ['@dtoki', 0],
      ['@alireza.eva.u23', 1]
    ]);
    const myUserID = 2;
    const parsedCommand = {
      type: START,
      username: '@grace',
      name: 'artris'
    };
    assert.throws(
      () => start(parsedCommand, usernameToIds, myUserID, events),
      /the user @grace does not exist/
    );
  });

  it('should throw an error given an event that does not exist', function () {
    const events = new Set(['lazy-jar']);
    const usernameToIds = new Map([
      ['@dtoki', 0],
      ['@alireza.eva.u23', 1]
    ]);
    const myUserID = 2;
    const parsedCommand = {
      type: START,
      username: '@dtoki',
      name: 'artris'
    };
    assert.throws(
      () => start(parsedCommand, usernameToIds, myUserID, events),
      /the project specified does not exist/
    );
  });
})