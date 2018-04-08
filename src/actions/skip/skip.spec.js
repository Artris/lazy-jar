const assert = require('assert');
const moment = require('moment');
const skip = require('./skip');
const { SKIP } = require('../../commands');

describe('skip action', function() {
  it('should correctly return a skip action', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }],
      ['@grace', { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };
    const parsedCommand = {
      type: SKIP,
      for: '2 days',
      username: '@dtoki',
      name: 'artris'
    };
    const expected = {
      type: SKIP,
      event: 'artris',
      userInfo: { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' },
      skip_until: moment()
        .add(2, 'days')
        .format('DD-MM-YYYY')
    };
    const result = skip(parsedCommand, usernameToUserInfo, myUserInfo, events);
    assert.deepEqual(result, expected);
  });

  it('should throw an error given a username that does not exist', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };
    const parsedCommand = {
      type: SKIP,
      for: '2 days',
      username: '@grace',
      name: 'artris'
    };
    assert.throws(
      () => skip(parsedCommand, usernameToUserInfo, myUserInfo, events),
      /the user @grace does not exist/
    );
  });

  it('should throw an error given an event that does not exist', function() {
    const events = new Set(['lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };
    const parsedCommand = {
      type: SKIP,
      for: '2 days',
      username: '@dtoki',
      name: 'artris'
    };
    assert.throws(
      () => skip(parsedCommand, usernameToUserInfo, myUserInfo, events),
      /the project specified does not exist/
    );
  });

  it('should throw an error given an incorrect time', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }],
      ['@grace', { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };
    const parsedCommand = {
      type: SKIP,
      for: '2',
      username: '@dtoki',
      name: 'artris'
    };
    assert.throws(
      () => skip(parsedCommand, usernameToUserInfo, myUserInfo, events),
      /please specify the period in days\/months\/years e.g ...for 2 days/
    );
  });
});
