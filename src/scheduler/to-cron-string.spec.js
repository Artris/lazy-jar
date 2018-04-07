const assert = require('assert');
const toCronString = require('./to-cron-string');

describe('toCronString', function() {
  it('should support weekday frequency', function() {
    const expected = '0 40 10 * * 1-5';
    const result = toCronString({
      frequency: 'WEEKDAYS',
      time: {
        hh: 10,
        mm: 40
      }
    });
    assert.equal(result, expected);
  });

  it('should support weekend frequency', function() {
    const expected = '0 30 6 * * 6,7';
    const result = toCronString({
      frequency: 'WEEKENDS',
      time: {
        hh: 6,
        mm: 30
      }
    });
    assert.equal(result, expected);
  });

  it('should support a single day of week', function() {
    const expected = '0 4 23 * * 3';
    const result = toCronString({
      frequency: 'WEDNESDAYS',
      time: {
        hh: 23,
        mm: 4
      }
    });
    assert.equal(result, expected);
  });

  it('should throw for unkown frequencies', function() {
    const invalidInput = {
      frequency: 'UNKNOWN',
      time: {
        hh: 23,
        mm: 4
      }
    };
    assert.throws(() => {
      toCronString(invalidInput);
    }, 'Invalid Frequency: UNKNOWN');
  });
});
