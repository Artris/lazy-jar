const assert = require('assert');
const schedule = require('./schedule');
const { SCHEDULE } = require('../../commands');

describe('schedule action', function() {
  it('should correctly return a schedule action', function() {
    const events = new Set(['lazy-jar']);
    const usernameToIds = new Map([
      ['@dtoki', 0],
      ['@alireza.eva.u23', 1],
      ['@grace', 2]
    ]);
    const myUserID = 2;

    const parsedCommand = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@alireza.eva.u23', 'me'],
      when: 'everyday at 6:00 am'
    };
    const expected = {
      type: SCHEDULE,
      event: 'artris',
      userIds: [1, 2],
      time: {
        hh: 6,
        mm: 0,
        zone: 'UTC'
      },
      frequency: 'EVERYDAY'
    };
    const result = schedule(parsedCommand, usernameToIds, myUserID, events);
    assert.deepEqual(result, expected);
  });

  it('should throw an error given an event that already exists', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const usernameToIds = new Map([
      ['@dtoki', 0],
      ['@alireza.eva.u23', 1],
      ['@grace', 2]
    ]);
    const myUserID = 2;
    const parsedCommand = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@alireza.eva.u23', 'me'],
      when: 'everyday at 6:00 am'
    };
    assert.throws(
      () => schedule(parsedCommand, usernameToIds, myUserID, events),
      /the project artris already exists/
    );
  });

  it('should throw an error given a username that does not exist', function() {
    const events = new Set(['lazy-jar']);
    const usernameToIds = new Map([['@dtoki', 0], ['@alireza.eva.u23', 1]]);
    const myUserID = 2;
    const parsedCommand = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@grace', 'me'],
      when: 'everyday at 6:00 am'
    };
    assert.throws(
      () => schedule(parsedCommand, usernameToIds, myUserID, events),
      /the user @grace does not exist/
    );
  });

  it('should throw an error given an incorrect time', function() {
    const events = new Set(['lazy-jar']);
    const usernameToIds = new Map([
      ['@dtoki', 0],
      ['@alireza.eva.u23', 1],
      ['@grace', 2]
    ]);
    const myUserID = 2;
    const parsedCommand = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@alireza.eva.u23', 'me'],
      when: 'everyday at 6'
    };
    assert.throws(
      () => schedule(parsedCommand, usernameToIds, myUserID, events),
      /please specify a date in the format/
    );
  });

  it('should throw an error given incorrect frequency', function() {
    const events = new Set(['lazy-jar']);
    const usernameToIds = new Map([
      ['@dtoki', 0],
      ['@alireza.eva.u23', 1],
      ['@grace', 2]
    ]);
    const myUserID = 2;
    const parsedCommand = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@alireza.eva.u23', 'me'],
      when: 'once at 6:00 am'
    };
    assert.throws(
      () => schedule(parsedCommand, usernameToIds, myUserID, events),
      /please specify when you want the meetings to happen eg. weekdays, everyday, Saturdays .../
    );
  });
});
