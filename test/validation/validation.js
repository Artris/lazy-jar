const assert = require('assert');
const {
  eventExists,
  eventAlreadyExists,
  mapUsernameToIDs,
  mapToFrequency,
  mapToTime
} = require('../../src/validation/validation');


describe('validate mapping from username to user ID', function () {
  it('should correctly map user names to ids', function () {
    const usernameToIds = new Map([
      ['@dtoki', 0],
      ['@alireza.eva.u23', 1],
      ['@grace', 2]
    ])
    usernames = ['@dtoki', 'me']
    const myUserID = 2
    const expected = [0, 2]
    const mapping = mapUsernameToIDs(usernames, usernameToIds, myUserID)

    assert.deepEqual(expected, mapping)
  });

  it('should correctly validate and transform a time in a string into an object -format: hh:mm am', function () {
    const timeString = '12:30 am everyday'
    const expected = {
      hh: '0',
      mm: '30',
      'zone': 'UTC'
    }
    const time = mapToTime(timeString, 'UTC')
    assert.deepEqual(expected, time)
  });

  it('should correctly validate and transform a time in a string into an object -format: hh:mm pm', function () {
    const timeString = '6:30 pm everyday'
    const expected = {
      hh: '18',
      mm: '30',
      'zone': 'UTC'
    }
    const time = mapToTime(timeString, 'UTC')
    assert.deepEqual(expected, time)
  });

  it('should correctly validate and transform a time in a string into an object -format: hham', function () {
    const timeString = '6am everyday'
    const expected = {
      hh: '6',
      mm: '0',
      'zone': 'UTC'
    }
    const time = mapToTime(timeString, 'UTC')
    assert.deepEqual(expected, time)
  });

  it('should correctly validate and transform a time in a string into an object -format: hhpm', function () {
    const timeString = '6pm everyday'
    const expected = {
      hh: '18',
      mm: '0',
      'zone': 'UTC'
    }
    const time = mapToTime(timeString, 'UTC')
    assert.deepEqual(expected, time)
  });

  it('should correctly validate and transform a time in a string into an object -format: hh:mmpm', function () {
    const timeString = '6:30pm everyday'
    const expected = {
      hh: '18',
      mm: '30',
      'zone': 'UTC'
    }
    const time = mapToTime(timeString, 'UTC')
    assert.deepEqual(expected, time)
  });

  it('should correctly validate and transform a time in a string into an object -format: hh:mmam', function () {
    const timeString = '6:30am everyday'
    const expected = {
      hh: '6',
      mm: '30',
      'zone': 'UTC'
    }
    const time = mapToTime(timeString, 'UTC')
    assert.deepEqual(expected, time)
  });

  it('should correctly validate and transform a time in a string into an object -format: 24:00', function () {
    const timeString = '24:00 everyday'
    const expected = {
      hh: '0',
      mm: '0',
      'zone': 'UTC'
    }
    const time = mapToTime(timeString, 'UTC')
    assert.deepEqual(expected, time)
  });

  it('should correctly validate and transform a time in a string into an object -format: 12:00am', function () {
    const timeString = '12:00am everyday'
    const expected = {
      hh: '0',
      mm: '0',
      'zone': 'UTC'
    }
    const time = mapToTime(timeString, 'UTC')
    assert.deepEqual(expected, time)
  });

  it('should correctly validate and transform a time in a string into an object -format: 00:00', function () {
    const timeString = '00:00 everyday'
    const expected = {
      hh: '0',
      mm: '0',
      'zone': 'UTC'
    }
    const time = mapToTime(timeString, 'UTC')
    assert.deepEqual(expected, time)
  });

  it('should correctly validate and transform a time in a string into an object -format: 0am', function () {
    const timeString = '0am everyday'
    const expected = {
      hh: '0',
      mm: '0',
      'zone': 'UTC'
    }
    const time = mapToTime(timeString, 'UTC')
    assert.deepEqual(expected, time)
  });

  it('should correctly validate and transform a time in a string into an object -format: 12pm ', function () {
    const timeString = '12pm everyday'
    const expected = {
      hh: '12',
      mm: '0',
      'zone': 'UTC'
    }
    const time = mapToTime(timeString, 'UTC')
    assert.deepEqual(expected, time)
  });

  it('should correctly validate and transform a time in a string into an object -format: hh where hh > 12 ', function () {
    const timeString = '13 everyday'
    const expected = {
      hh: '13',
      mm: '0',
      'zone': 'UTC'
    }
    const time = mapToTime(timeString, 'UTC')
    assert.deepEqual(expected, time)
  });

  it('should correctly validate and transform a time in a string into an object - format: hh where hh < 12 ', function () {
    const timeString = '6 everyday'
    const expected = {
      hh: '6',
      mm: '0',
      'zone': 'UTC'
    }
    const time = mapToTime(timeString, 'UTC')
    assert.deepEqual(expected, time)
  });

  it('should correctly validate and transform the frequency given a string', function () {
    const period = '12:30 am every day'
    const expected = 'EVERYDAY'
    const frequency = mapToFrequency(period)
    assert.deepEqual(expected, frequency)
  })

  it('should correctly validate and transform the frequency given a string', function () {
    const period = '12:30 am every work day'
    const expected = 'WEEKDAYS'
    const frequency = mapToFrequency(period)
    assert.deepEqual(expected, frequency)
  })

  it('should correctly validate and transform the frequency given a string', function () {
    const period = '12:30 am everyday'
    const expected = 'EVERYDAY'
    const frequency = mapToFrequency(period)
    assert.deepEqual(expected, frequency)
  })

  it('should correctly validate and transform the frequency given a string', function () {
    const period = '12:30 am EVERYDAY'
    const expected = 'EVERYDAY'
    const frequency = mapToFrequency(period)
    assert.deepEqual(expected, frequency)
  })

  it('should correctly validate and transform the frequency given a string', function () {
    const period = '12:20 on weekends'
    const expected = 'WEEKENDS'
    const frequency = mapToFrequency(period)
    assert.deepEqual(expected, frequency)
  })

  it('should correctly validate and transform the frequency given a string', function () {
    const period = '12:20 on saterdays'
    const expected = 'SATERDAYS'
    const frequency = mapToFrequency(period)
    assert.deepEqual(expected, frequency)
  })

});