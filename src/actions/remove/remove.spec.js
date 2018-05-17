const assert = require('assert');
const remove = require('./remove');
const { REMOVE } = require('../../commands');

describe('remove action', function() {
  it('should correctly return remove action', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }],
      ['@grace', { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };
    const parsedCommand = {
      type: REMOVE,
      from: 'artris',
      usernames: ['me']
    };
    const expected = {
      type: REMOVE,
      event: 'artris',
      userInfos: [{ user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }]
    };
    const result = remove(
      parsedCommand,
      usernameToUserInfo,
      myUserInfo,
      events
    );
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
      type: REMOVE,
      from: 'artris',
      usernames: ['me']
    };
    assert.throws(
      () => remove(parsedCommand, usernameToUserInfo, myUserInfo, events),
      /the project specified does not exist/
    );
  });

  it('should throw an error given a username that does not exist', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const myUserId = 0;
    const usernameToIds = new Map([
      ['@dtoki', 0],
      ['@alireza.eva.u23', 1]
    ]);
    const parsedCommand = {
      type: REMOVE,
      from: 'artris',
      usernames: ['@grace']
    };
    assert.throws(
      () => remove(parsedCommand, usernameToIds, myUserId, events),
      /the user @grace does not exist/
    );
  });
});
