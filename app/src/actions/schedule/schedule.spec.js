const assert = require('assert');
const schedule = require('./schedule');
const { SCHEDULE } = require('../../commands');

describe('schedule action', function() {
  it('should correctly return a schedule action', function() {
    const events = new Set(['lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }],
      ['@grace', { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };

    const parsedCommand = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@alireza.eva.u23', 'me'],
      when: 'everyday at 6:00 am America/Vancouver'
    };
    const expected = {
      type: SCHEDULE,
      event: 'artris',
      userInfos: [
        { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' },
        { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }
      ],
      time: {
        hh: 6,
        mm: 0,
        zone: 'America/Vancouver'
      },
      frequency: 'EVERYDAY'
    };
    const result = schedule(
      parsedCommand,
      usernameToUserInfo,
      myUserInfo,
      events
    );
    assert.deepEqual(result, expected);
  });

  it('should throw an error given an event that already exists', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }],
      ['@grace', { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };
    const parsedCommand = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@alireza.eva.u23', 'me'],
      when: 'everyday at 6:00 am',
      zone: 'America/Vancouver'
    };
    assert.throws(
      () => schedule(parsedCommand, usernameToUserInfo, myUserInfo, events),
      /the project artris already exists/
    );
  });

  it('should throw an error given a username that does not exist', function() {
    const events = new Set(['lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };
    const parsedCommand = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@grace', 'me'],
      when: 'everyday at 6:00 am',
      zone: 'America/Vancouver'
    };
    assert.throws(
      () => schedule(parsedCommand, usernameToUserInfo, myUserInfo, events),
      /the user @grace does not exist/
    );
  });

  it('should throw an error given an incorrect time', function() {
    const events = new Set(['lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }],
      ['@grace', { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };
    const parsedCommand = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@alireza.eva.u23', 'me'],
      when: 'everyday at 6 America/Vancouver'
    };
    assert.throws(
      () => schedule(parsedCommand, usernameToUserInfo, myUserInfo, events),
      /incorrectly formatted time/
    );
  });

  it('should throw an error given incorrect frequency', function() {
    const events = new Set(['lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }],
      ['@grace', { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };
    const parsedCommand = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@alireza.eva.u23', 'me'],
      when: 'once at 6:00 am America/Vancouver'
    };
    assert.throws(
      () => schedule(parsedCommand, usernameToUserInfo, myUserInfo, events),
      /incorrect frequency/
    );
  });
  it('should throw an error given an incorrect zone', function() {
    const events = new Set(['lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }],
      ['@grace', { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };
    const parsedCommand = {
      type: SCHEDULE,
      event: 'artris',
      usernames: ['@alireza.eva.u23', 'me'],
      when: 'everyday at 6:00 am ../..'
    };
    assert.throws(
      () => schedule(parsedCommand, usernameToUserInfo, myUserInfo, events),
      /incorrect timezone/
    );
  })
});
