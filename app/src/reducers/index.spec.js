const assert = require('assert');
const lazyJar = require('./index');

const {
  ADD,
  REMOVE,
  HALT,
  MOVE,
  RESUME,
  SCHEDULE,
  SKIP,
  TERMINATE,
  START,
  STOP,
  SET
} = require('../commands');

describe('reducers', function() {
  it('should correctly create a new event to the state from SCHEDULE action', function() {
    /*for a schedule action the state passed in is an object with key team_id*/
    const state = {
      team_id: 'XYX'
    };
    const action = {
      type: SCHEDULE,
      event: 'artris',
      userInfos: [
        { user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' },
        { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }
      ],
      frequency: 'EVERYDAY',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      }
    };
    const expected = {
      team_id: 'XYX',
      event_id: 'artris',
      time_to_respond: 900,
      members: [{
          user_id: 'U_ID_1',
          user_im_id: 'U_IM_ID_1',
          ignore: false
        },
        {
          user_id: 'U_ID_2',
          user_im_id: 'U_IM_ID_2',
          ignore: false
        }
      ],
      frequency: 'EVERYDAY',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: false
    };

    const newState = lazyJar(action, state);
    assert.deepEqual(expected, newState);
  });

  it('should correctly remove project from state with TERMINATE action', function() {
    const state = {
      team_id: 'TXY',
      event_id: 'artris',
      time_to_respond: 900,
      members: [{
          user_id: 'U_ID_1',
          user_im_id: 'U_IM_ID_1',
          ignore: false
        },
        {
          user_id: 'U_ID_2',
          user_im_id: 'U_IM_ID_2',
          ignore: false
        }
      ],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: false
    };
    const action = {
      type: TERMINATE,
      event: 'artris'
    };
    const expected = {};
    const newState = lazyJar(action, state);
    assert.deepEqual(expected, newState);
  });

  it('should correctly add new ids to project given ADD action', function() {
    const state = {
      team_id: 'TXC',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
          user_id: 'U_ID_1',
          user_im_id: 'U_IM_ID_1',
          ignore: false
        },
        {
          user_id: 'U_ID_2',
          user_im_id: 'U_IM_ID_2',
          ignore: false
        }
      ],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: false
    };
    const action = {
      type: ADD,
      event: 'lazy-jar',
      userInfos: [
        { user_id: 'U_ID_0', user_im_id: 'U_IM_ID_0' },
        { user_id: 'U_ID_2', user_im_id: 'U_IM_ID_2' }
      ]
    };
    const expected = {
      team_id: 'TXC',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
          user_id: 'U_ID_1',
          user_im_id: 'U_IM_ID_1',
          ignore: false
        },
        {
          user_id: 'U_ID_2',
          user_im_id: 'U_IM_ID_2',
          ignore: false
        },
        {
          user_id: 'U_ID_0',
          user_im_id: 'U_IM_ID_0',
          ignore: false
        }
      ],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: false
    };
    const newState = lazyJar(action, state);
    assert.deepEqual(expected, newState);
  });

  it('should correctly remove ids from project given REMOVE action', function() {
    const state = {
      team_id: 'CHG',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
          user_id: 'U_ID_1',
          user_im_id: 'U_IM_ID_1',
          ignore: false
        },
        {
          user_id: 'U_ID_2',
          user_im_id: 'U_IM_ID_2',
          ignore: false
        }
      ],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: false
    };
    const action = {
      type: REMOVE,
      event: 'lazy-jar',
      userInfos: [{ user_id: 'U_ID_1', user_im_id: 'U_IM_ID_1' }]
    };
    const expected = {
      team_id: 'CHG',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
        user_id: 'U_ID_2',
        user_im_id: 'U_IM_ID_2',
        ignore: false
      }],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: false
    };
    const newState = lazyJar(action, state);
    assert.deepEqual(expected, newState);
  });

  it('should correctly set halted to true given HALT action', function() {
    const state = {
      team_id: 'CBV',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
        user_id: 'U_ID_2',
        user_im_id: 'U_IM_ID_2',
        ignore: false
      }],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: false
    };
    const action = {
      type: HALT,
      event: 'lazy-jar'
    };
    const expected = {
      team_id: 'CBV',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
        user_id: 'U_ID_2',
        user_im_id: 'U_IM_ID_2',
        ignore: false
      }],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: true
    };
    const newState = lazyJar(action, state);
    assert.deepEqual(expected, newState);
  });

  it('should correctly set halted to false given RESUME action', function() {
    const state = {
      team_id: 'CBV',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
        user_id: 'U_ID_2',
        user_im_id: 'U_IM_ID_2',
        ignore: false
      }],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: true
    };
    const action = {
      type: RESUME,
      event: 'lazy-jar'
    };
    const expected = {
      team_id: 'CBV',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
        user_id: 'U_ID_2',
        user_im_id: 'U_IM_ID_2',
        ignore: false
      }],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: false
    };
    const newState = lazyJar(action, state);
    assert.deepEqual(expected, newState);
  });

  it('should correctly set skip_until key for a member', function() {
    const state = {
      team_id: 'CBV',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
          user_id: 'U_ID_2',
          user_im_id: 'U_IM_ID_2',
          ignore: false
        },
        {
          user_id: 'U_ID_3',
          user_im_id: 'U_IM_ID_3',
          ignore: false
        }
      ],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: true
    };
    const action = {
      type: SKIP,
      event: 'lazy-jar',
      userInfo: {
        user_id: 'U_ID_2',
        user_im_id: 'U_IM_ID_2'
      },
      skip_until: '16-10-2018'
    };
    const expected = {
      team_id: 'CBV',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
          user_id: 'U_ID_2',
          user_im_id: 'U_IM_ID_2',
          ignore: false,
          skip_until: '16-10-2018'
        },
        {
          user_id: 'U_ID_3',
          user_im_id: 'U_IM_ID_3',
          ignore: false
        }
      ],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: true
    };
    const newState = lazyJar(action, state);
    assert.deepEqual(expected, newState);
  });

  it('should correctly update the state given START action', function() {
    const state = {
      team_id: 'CBV',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
          user_id: 'U_ID_2',
          user_im_id: 'U_IM_ID_2',
          ignore: false,
          skip_until: '16-10-2018'
        },
        {
          user_id: 'U_ID_3',
          user_im_id: 'U_IM_ID_3',
          ignore: false
        }
      ],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: true
    };
    const action = {
      type: START,
      event: 'lazy-jar',
      userInfo: {
        user_id: 'U_ID_2',
        user_im_id: 'U_IM_ID_2'
      }
    };
    const expected = {
      team_id: 'CBV',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
          user_id: 'U_ID_2',
          user_im_id: 'U_IM_ID_2',
          ignore: false
        },
        {
          user_id: 'U_ID_3',
          user_im_id: 'U_IM_ID_3',
          ignore: false
        }
      ],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: true
    };
    const newState = lazyJar(action, state);
    assert.deepEqual(expected, newState);
  });

  it('should correctly update the state given STOP action', function() {
    const state = {
      team_id: 'CBV',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
          user_id: 'U_ID_2',
          user_im_id: 'U_IM_ID_2',
          ignore: false
        },
        {
          user_id: 'U_ID_3',
          user_im_id: 'U_IM_ID_3',
          ignore: false
        }
      ],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: true
    };
    const action = {
      type: STOP,
      event: 'lazy-jar',
      userInfo: {
        user_id: 'U_ID_2',
        user_im_id: 'U_IM_ID_2'
      }
    };
    const expected = {
      team_id: 'CBV',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
          user_id: 'U_ID_2',
          user_im_id: 'U_IM_ID_2',
          ignore: true
        },
        {
          user_id: 'U_ID_3',
          user_im_id: 'U_IM_ID_3',
          ignore: false
        }
      ],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: true
    };
    const newState = lazyJar(action, state);
    assert.deepEqual(expected, newState);
  });
  
  it('should correctly update the state given MOVE action', function() {
    const state = {
      team_id: 'CBV',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
        user_id: 'U_ID_2',
        user_im_id: 'U_IM_ID_2',
        ignore: false
      }],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: false
    };
    const action = {
      type: MOVE,
      event: 'lazy-jar',
      time: {
        hh: 7,
        mm: 0,
        zone: 'America/Vancouver'
      },
      frequency: 'WEEKDAYS'
    };
    const expected = {
      team_id: 'CBV',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
        user_id: 'U_ID_2',
        user_im_id: 'U_IM_ID_2',
        ignore: false
      }],
      frequency: 'WEEKDAYS',
      time: {
        hh: 7,
        mm: 0,
        zone: 'America/Vancouver'
      },
      halted: false
    };
    const newState = lazyJar(action, state);
    assert.deepEqual(expected, newState);
  });
  
it('should correctly update the state given SET action', function() {
    const state = {
      team_id: 'CBV',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members: [{
          user_id: 'U_ID_2',
          user_im_id: 'U_IM_ID_2',
          ignore: false
        },
        {
          user_id: 'U_ID_3',
          user_im_id: 'U_IM_ID_3',
          ignore: false
        }
      ],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: true
    };
    const action = {
      type: SET,
      event: 'lazy-jar',
      url: 'artris.com'
    }
    const expected = {
      team_id: 'CBV',
      event_id: 'lazy-jar',
      url: 'artris.com',
      time_to_respond: 900,
      members: [{
          user_id: 'U_ID_2',
          user_im_id: 'U_IM_ID_2',
          ignore: false
        },
        {
          user_id: 'U_ID_3',
          user_im_id: 'U_IM_ID_3',
          ignore: false
        }
      ],
      frequency: 'WEEKDAYS',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      },
      halted: true
    };
    const newState = lazyJar(action, state);
    assert.deepEqual(expected, newState);

  })
});
