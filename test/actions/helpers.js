const assert = require('assert');
const {
  eventExists,
  eventAlreadyExists,
  mapUsernameToIDs,
  mapToFrequency,
  mapToTime
} = require('../../src/actions/helpers');

describe('helpers', function () {
  describe('mapUsernameToIds', function () {
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

    it('should throw an error given a username that does not exist', function () {
      const usernameToIds = new Map([
        ['@alireza.eva.u23', 1],
        ['@grace', 2]
      ])
      usernames = ['@dtoki', 'me']
      const myUserID = 2
      assert.throws(() => mapUsernameToIDs(usernames, usernameToIds, myUserID), Error)
    });
  });

  describe('mapToTime', function () {
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
      const timeString = 'everyday at 12:30 pm'
      const expected = {
        hh: '12',
        mm: '30',
        'zone': 'UTC'
      }
      const time = mapToTime(timeString, 'UTC')
      assert.deepEqual(expected, time)
    });

    it('should correctly validate and transform a time in a string into an object -format: h:mm am', function () {
      const timeString = 'everyday at 1:30 am'
      const expected = {
        hh: '1',
        mm: '30',
        'zone': 'UTC'
      }
      const time = mapToTime(timeString, 'UTC')
      assert.deepEqual(expected, time)
    });

    it('should correctly validate and transform a time in a string into an object -format: 0h:mm am', function () {
      const timeString = 'everyday at 01:30 am'
      const expected = {
        hh: '1',
        mm: '30',
        'zone': 'UTC'
      }
      const time = mapToTime(timeString, 'UTC')
      assert.deepEqual(expected, time)
    });

    it('should throw an error given incorrect time format -format hh:mmam', function () {
      const timeString = '12:30am everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given incorrect time format -format hh:mmpm', function () {
      const timeString = '12:30pm everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given incorrect time format -format hh pm', function () {
      const timeString = '12 pm everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given incorrect time format -format hh am', function () {
      const timeString = '11 am everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given incorrect time format -format hh:mm', function () {
      const timeString = '12:30 everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given incorrect time format -format h', function () {
      const timeString = '6 everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given incorrect time format -format hh:mmmm am', function () {
      const timeString = '6:2020 am everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given incorrect time format -format hh:mmm am', function () {
      const timeString = '6:000 am everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given incorrect time format -format hh:m am', function () {
      const timeString = '6:2 am everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given incorrect time format -format :mmm am', function () {
      const timeString = ':120 am everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given incorrect time format -format hhhh am', function () {
      const timeString = '6000 am everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given correct format but illegal times -format hh:mm am where hh > 12', function () {
      const timeString = '13:00 am everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given correct format but illegal times -format hh:mm pm where hh > 12', function () {
      const timeString = '13:00 pm everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given correct format but illegal times -format hh:mm pm where mm > 59', function () {
      const timeString = '1:60 pm everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given no time', function () {
      const timeString = 'everyday'
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });

    it('should throw an error given an empty string', function () {
      const timeString = ''
      assert.throws(() => mapToTime(timeString, 'UTC'), Error)
    });
  });

  describe('mapToFrequency', function () {
    it('should correctly validate and transform the frequency given a string', function () {
      const period = '12:30 am every day'
      const expected = 'EVERYDAY'
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
      const period = '12:30 am every work day'
      const expected = 'WEEKDAYS'
      const frequency = mapToFrequency(period)
      assert.deepEqual(expected, frequency)
    })

    it('should correctly validate and transform the frequency given a string', function () {
      const period = '12:30 am on workdays'
      const expected = 'WEEKDAYS'
      const frequency = mapToFrequency(period)
      assert.deepEqual(expected, frequency)
    })

    it('should correctly validate and transform the frequency given a string', function () {
      const period = '12:30 am on weekdays'
      const expected = 'WEEKDAYS'
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
      const period = '12:20 on saturdays'
      const expected = 'SATURDAYS'
      const frequency = mapToFrequency(period)
      assert.deepEqual(expected, frequency)
    })

    it('should throw an error given an incorrect frequency', function () {
      const period = 'once every blue moon at 4am'
      assert.throws(() => mapToFrequency(period), Error)
    });

    it('should throw an error given an incorrect frequency', function () {
      const period = 'never - I dont want to work'
      assert.throws(() => mapToFrequency(period), Error)
    });
  });

  describe('eventExists', function () {
    it('should correctly check if an event exists and not throw an error', function () {
      const events = new Set(['artris', 'lazy-jar'])
      eventExists('artris', events)
    });

    it('should throw an error given an event that does not exist', function () {
      const events = new Set(['lazy-jar'])
      assert.throws(() => eventExists('artris'), Error)
    });
  });

  describe('eventAlreadyExists', function () {
    it('should correctly check if an event already exists given an event that does not exist', function () {
      const events = new Set(['lazy-jar'])
      eventAlreadyExists('artris', events)
    });

    it('should throw an error given an event that already exists', function () {
      const events = new Set(['artris', 'lazy-jar'])
      assert.throws(() => eventAlreadyExists('artris'), Error)
    });
  })
})