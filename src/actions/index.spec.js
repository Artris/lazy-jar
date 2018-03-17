const assert = require('assert');
const { createAction } = require('./index');
const {
  ADD,
  REMOVE,
  HALT,
  MOVE,
  RESUME,
  SCHEDULE,
  SKIP,
  STATUS,
  TERMINATE
} = require('../commands');

describe('createAction', function() {
  const events = new Set(['artris', 'lazy-jar']);
  const usernameToIds = new Map([
    ['@dtoki', 0],
    ['@alireza.eva.u23', 1],
    ['@grace', 2]
  ]);
  const myUserID = 2;
  zone = 'UTC';
  it('should correctly return add action', function() {
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
    const result = createAction(
      parsedCommand,
      usernameToIds,
      myUserID,
      events,
      zone
    );
    assert.deepEqual(result, expected);
  });

  it('should correctly return remove action', function() {
    const parsedCommand = {
      type: REMOVE,
      event: 'artris',
      usernames: ['me']
    };
    const expected = {
      type: REMOVE,
      event: 'artris',
      userIds: [2]
    };
    const result = createAction(
      parsedCommand,
      usernameToIds,
      myUserID,
      events,
      zone
    );
    assert.deepEqual(result, expected);
  });

  it('should correctly return halt action', function() {
    const parsedCommand = {
      type: HALT,
      event: 'artris'
    };
    const expected = {
      type: HALT,
      event: 'artris'
    };
    const result = createAction(
      parsedCommand,
      usernameToIds,
      myUserID,
      events,
      zone
    );
    assert.deepEqual(result, expected);
  });

  it('should correctly return a move action', function() {
    const parsedCommand = {
      type: MOVE,
      event: 'artris',
      to: '6:30 am everyday'
    };
    const expected = {
      type: MOVE,
      event: 'artris',
      time: {
        hh: 6,
        mm: 30,
        zone: 'UTC'
      },
      frequency: 'EVERYDAY'
    };
    const result = createAction(
      parsedCommand,
      usernameToIds,
      myUserID,
      events,
      zone
    );
    assert.deepEqual(result, expected);
  });

  it('should correctly return a resume action', function() {
    const parsedCommand = {
      type: RESUME,
      event: 'artris'
    };
    const expected = {
      type: RESUME,
      event: 'artris'
    };
    const result = createAction(
      parsedCommand,
      usernameToIds,
      myUserID,
      events,
      zone
    );
    assert.deepEqual(result, expected);
  });

  it('should correctly return a schedule action', function() {
    const parsedCommand = {
      type: SCHEDULE,
      event: 'feeling lucky',
      usernames: ['@alireza.eva.u23', 'me'],
      when: 'everyday at 6:00 am'
    };
    const expected = {
      type: SCHEDULE,
      event: 'feeling lucky',
      userIds: [1, 2],
      time: {
        hh: 6,
        mm: 0,
        zone: 'UTC'
      },
      frequency: 'EVERYDAY'
    };
    const result = createAction(
      parsedCommand,
      usernameToIds,
      myUserID,
      events,
      zone
    );
    assert.deepEqual(result, expected);
  });

  it('should correctly return a skip action', function() {
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
    const result = createAction(
      parsedCommand,
      usernameToIds,
      myUserID,
      events,
      zone
    );
    assert.deepEqual(result, expected);
  });

  it('should correctly return a status action', function() {
    const parsedCommand = {
      type: STATUS
    };
    const expected = {
      type: STATUS
    };
    const result = createAction(
      parsedCommand,
      usernameToIds,
      myUserID,
      events,
      zone
    );
    assert.deepEqual(result, expected);
  });

  it('should correctly return terminate action', function() {
    const parsedCommand = {
      type: TERMINATE,
      event: 'artris'
    };
    const expected = {
      type: TERMINATE,
      event: 'artris'
    };
    const result = createAction(
      parsedCommand,
      usernameToIds,
      myUserID,
      events,
      zone
    );
    assert.deepEqual(result, expected);
  });
});
