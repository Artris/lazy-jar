const assert = require('assert');
const { lazyJar } = require('./index');

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

describe('reducers', function() {
  it('should correctly add a new event to the state from SCHEDULE action', function() {
    const state = {
      'lazy-jar': {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      }
    };
    const action = {
      type: SCHEDULE,
      event: 'artris',
      userIds: [0, 1, 2],
      frequency: 'EVERYDAY',
      time: {
        hh: 1,
        mm: 10,
        zone: 'UTC'
      }
    };
    const expected = {
      'lazy-jar': {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      },
      artris: {
        userIds: [0, 1, 2],
        frequency: 'EVERYDAY',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      }
    };
    const newState = lazyJar(state, action);
    assert.deepEqual(expected, newState);
  });

  it('should correctly remove project from state with TERMINATE action', function() {
    const state = {
      'lazy-jar': {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      },
      artris: {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      }
    };
    const action = {
      type: TERMINATE,
      event: 'artris'
    };
    const expected = {
      'lazy-jar': {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      }
    };
    const newState = lazyJar(state, action);
    assert.deepEqual(expected, newState);
  });

  it('should correctly add new ids to project given ADD action', function() {
    const state = {
      'lazy-jar': {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      },
      artris: {
        userIds: [0, 2],
        frequency: 'EVERYDAY',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      }
    };
    const action = {
      type: ADD,
      event: 'artris',
      userIds: [1, 2]
    };
    const expected = {
      'lazy-jar': {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      },
      artris: {
        userIds: [0, 2, 1],
        frequency: 'EVERYDAY',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      }
    };
    const newState = lazyJar(state, action);
    assert.deepEqual(expected, newState);
  });

  it('should correctly remove ids from project given REMOVE action', function() {
    const state = {
      artris: {
        userIds: [0, 2],
        frequency: 'EVERYDAY',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      }
    };
    const action = {
      type: REMOVE,
      event: 'artris',
      userIds: [0]
    };
    const expected = {
      artris: {
        userIds: [2],
        frequency: 'EVERYDAY',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      }
    };
    const newState = lazyJar(state, action);
    assert.deepEqual(expected, newState);
  });

  it('should correctly set halted to true given HALT action', function() {
    const state = {
      'lazy-jar': {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      }
    };
    const action = {
      type: HALT,
      event: 'lazy-jar'
    };
    const expected = {
      'lazy-jar': {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: true
      }
    };
    const newState = lazyJar(state, action);
    assert.deepEqual(expected, newState);
  });

  it('should correctly set halted to false given RESUME action', function() {
    const state = {
      'lazy-jar': {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: true
      }
    };

    const action = {
      type: RESUME,
      event: 'lazy-jar'
    };
    const expected = {
      'lazy-jar': {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      }
    };
    const newState = lazyJar(state, action);
    assert.deepEqual(expected, newState);
  });

  it('should not modify the state for the SKIP action', function() {
    const state = {
      'lazy-jar': {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      }
    };
    const action = {
      type: SKIP,
      event: 'artris',
      userId: 0,
      days: 2
    };
    const expected = {
      'lazy-jar': {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      }
    };
    const newState = lazyJar(state, action);
    assert.deepEqual(expected, newState);
  });

  it('should correctly remove project from state with TERMINATE action', function() {
    const state = {
      'lazy-jar': {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      },
      artris: {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      }
    };
    const action = {
      type: TERMINATE,
      event: 'artris'
    };
    const expected = {
      'lazy-jar': {
        userIds: [0, 2],
        frequency: 'WEEKDAYS',
        time: {
          hh: 1,
          mm: 10,
          zone: 'UTC'
        },
        halted: false
      }
    };
    const newState = lazyJar(state, action);
    assert.deepEqual(expected, newState);
  });
});
