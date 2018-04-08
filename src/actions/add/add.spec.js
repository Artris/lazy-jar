const assert = require('assert');
const add = require('./add');
const { ADD } = require('../../commands');

describe('add action', function() {
  it('should correctly return add action', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }],
      ['@grace', { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };
    const parsedCommand = {
      type: ADD,
      to: 'artris',
      usernames: ['@dtoki', '@alireza.eva.u23', 'me']
    };
    const expected = {
      type: ADD,
      event: 'artris',
      userInfos: [
        { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' },
        { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' },
        { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }
      ]
    };
    const result = add(parsedCommand, usernameToUserInfo, myUserInfo, events);
    assert.deepEqual(result, expected);
  });

  it('should throw an error given an event that does not exist', function() {
    const events = new Set(['lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }],
      ['@grace', { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };
    const parsedCommand = {
      type: ADD,
      to: 'artris',
      usernames: ['@dtoki', '@alireza.eva.u23', 'me']
    };
    assert.throws(
      () => add(parsedCommand, usernameToUserInfo, myUserInfo, events),
      /the project specified does not exist/
    );
  });

  it('should correctly throw an error given a username that does not exist', function() {
    const events = new Set(['lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' };
    const parsedCommand = {
      type: ADD,
      to: 'lazy-jar',
      usernames: ['@dtoki', '@grace', 'me']
    };
    assert.throws(
      () => add(parsedCommand, usernameToUserInfo, myUserInfo, events),
      /the user @grace does not exist/
    );
  });
});
