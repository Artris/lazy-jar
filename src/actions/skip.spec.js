const assert = require('assert');
const { skip } = require('./skip');
const { SKIP } = require('../commands');

describe('skip action', function() {
  it('should correctly return a skip action', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const usernameToIds = new Map([
      ['@dtoki', 0],
      ['@alireza.eva.u23', 1],
      ['@grace', 2]
    ]);
    const myUserID = 2;
    const parsedCommand = {
      type: SKIP,
      for: '2 days',
      username: '@dtoki',
      name: 'artris'
    };
    const expected = {
      type: SKIP,
      event: 'artris',
      userId: 0,
      days: 2
    };
    const result = skip(parsedCommand, usernameToIds, myUserID, events);
    assert.deepEqual(result, expected);
  });

  it('should throw an error given a username that does not exist', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const usernameToIds = new Map([['@dtoki', 0], ['@alireza.eva.u23', 1]]);
    const myUserID = 2;
    const parsedCommand = {
      type: SKIP,
      for: '2 days',
      username: '@grace',
      name: 'artris'
    };
    assert.throws(
      () => skip(parsedCommand, usernameToIds, myUserID, events),
      /the user @grace does not exist/
    );
  });

  it('should throw an error given an event that does not exist', function() {
    const events = new Set(['lazy-jar']);
    const usernameToIds = new Map([['@dtoki', 0], ['@alireza.eva.u23', 1]]);
    const myUserID = 2;
    const parsedCommand = {
      type: SKIP,
      for: '2 days',
      username: '@dtoki',
      name: 'artris'
    };
    assert.throws(
      () => skip(parsedCommand, usernameToIds, myUserID, events),
      /the project specified does not exist/
    );
  });

  it('should throw an error given an incorrect time', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const usernameToIds = new Map([
      ['@dtoki', 0],
      ['@alireza.eva.u23', 1],
      ['@grace', 2]
    ]);
    const myUserID = 2;
    const parsedCommand = {
      type: SKIP,
      for: '2',
      username: '@dtoki',
      name: 'artris'
    };
    assert.throws(
      () => skip(parsedCommand, usernameToIds, myUserID, events),
      /please specify the period in days e.g ...for 2 days/
    );
  });
});
