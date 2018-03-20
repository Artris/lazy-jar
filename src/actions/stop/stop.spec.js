const assert = require('assert');
const stop = require('./stop');
const {
  STOP
} = require('../../commands');

describe('stop action', function () {
  it('should correctly return stop action given correct input', function () {
    const events = new Set(['artris', 'lazy-jar']);
    const myUserId = 2;
    const usernameToIds = new Map([
      ['@dtoki', 0],
      ['@alireza.eva.u23', 1],
      ['@grace', 2]
    ]);
    const parsedCommand = {
      type: STOP,
      name: 'lazy-jar',
      username: 'me'
    };
    const expected = {
      type: STOP,
      event: 'lazy-jar',
      userId : 2
    };
    const result = stop(parsedCommand, usernameToIds, myUserId, events);
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
      type: STOP,
      username: '@grace',
      name: 'artris'
    };
    assert.throws(
      () => stop(parsedCommand, usernameToIds, myUserID, events),
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
      type: STOP,
      username: '@dtoki',
      name: 'artris'
    };
    assert.throws(
      () => stop(parsedCommand, usernameToIds, myUserID, events),
      /the project specified does not exist/
    );
  });
})