const assert = require('assert');
const start = require('./start');
const { START } = require('../../commands');

describe('start action', function() {
  it('should correctly return start action given correct input', function() {
    const events = new Set(['artris', 'lazy-jar']);
    const usernameToUserInfo = new Map([
      ['@dtoki', { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' }],
      ['@alireza.eva.u23', { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }],
      ['@grace', { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }]
    ]);
    const myUserInfo = { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' };
    const parsedCommand = {
      type: START,
      name: 'artris',
      username: 'me'
    };
    const expected = {
      type: START,
      event: 'artris',
      userInfo: { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }
    };
    const result = start(parsedCommand, usernameToUserInfo, myUserInfo, events);
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
      type: START,
      username: '@grace',
      name: 'artris'
    };
    assert.throws(
      () => start(parsedCommand, usernameToUserInfo, myUserInfo, events),
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
      type: START,
      username: '@dtoki',
      name: 'artris'
    };
    assert.throws(
      () => start(parsedCommand, usernameToUserInfo, myUserInfo, events),
      /the project specified does not exist/
    );
  });
});
