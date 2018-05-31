const assert = require('assert');
const stop = require('./stop');
const { STOP } = require('../../commands');

describe('stop action', function() {
  it('should correctly return stop action given correct input', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }],
      ['@grace', { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };
    const parsedCommand = {
      type: STOP,
      name: 'lazy-jar',
      username: 'me'
    };
    const expected = {
      type: STOP,
      event: 'lazy-jar',
      userInfo: { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }
    };
    const result = stop(parsedCommand, usernameToUserInfo, myUserInfo, events);
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
      type: STOP,
      username: '@grace',
      name: 'artris'
    };
    assert.throws(
      () => stop(parsedCommand, usernameToUserInfo, myUserInfo, events),
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
      type: STOP,
      username: '@dtoki',
      name: 'artris'
    };
    assert.throws(
      () => stop(parsedCommand, usernameToUserInfo, myUserInfo, events),
      /the project specified does not exist/
    );
  });
});
