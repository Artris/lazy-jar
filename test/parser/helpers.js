const assert = require('assert');
const {
  split,
  splitBy,
  parseTime,
  parseTimeRange
} = require('../../parser/helpers');
const { weekdays, workdays } = require('../../parser/constants');

describe('helpers', function() {
  describe('split', function() {
    it('should split the text at the first space only', function() {
      const text = 'schedule artris with @alireza.eva.u23 everyday at 6am';
      const expected = [
        'schedule',
        'artris with @alireza.eva.u23 everyday at 6am'
      ];
      const result = split(text, ' ');
      assert.deepEqual(result, expected);
    });

    it('should split the text and trim the each segment', function() {
      const text = '@alireza.eva.u23 everyday at 6am';
      const expected = ['@alireza.eva.u23', 'day at 6am'];
      const result = split(text, 'every');
      assert.deepEqual(result, expected);
    });

    it('should throw if the separator does not exists', function() {
      const text = 'a text without a dash';
      assert.throws(() => {
        split(text, '-');
      }, 'could not find "-"');
    });
  });

  describe('splitBy', function() {
    it('should split the text by a list of separators', function() {
      const text = 'schedule artris with @alireza.eva.u23 everyday at 6am';
      const separators = [' ', 'with', 'every'];
      const expected = ['schedule', 'artris', '@alireza.eva.u23', 'day at 6am'];
      const result = splitBy(text, separators);
      assert.deepEqual(result, expected);
    });

    it('should throw if one of the separators does not exists', function() {
      const text = 'schedule artris with @alireza.eva.u23 everyday at 6am';
      const separators = [' ', 'an invalid separator', 'every'];
      assert.throws(() => {
        split(text, separators);
      }, 'could not find "an invalid separator"');
    });
  });

  describe('parseTime', function() {
    it('should return a list of weekdays when message starts with "day"', function() {
      const text = 'day at 6am';
      const expected = {
        time: '6am',
        weekdays: weekdays
      };
      const result = parseTime(text);
      assert.deepEqual(result, expected);
    });

    it('should return a list of workdays when message starts with "workday"', function() {
      const text = 'workday at 6am';
      const expected = {
        time: '6am',
        weekdays: workdays
      };
      const result = parseTime(text);
      assert.deepEqual(result, expected);
    });

    it('should throw if days are not specified, it should return the text as time', function() {
      const text = '6am';
      const expected = { time: '6am' };
      const result = parseTime(text);
      assert.deepEqual(result, expected);
    });

    it('should throw if frequency identifier does not match "everyday" or "every workday"', function() {
      const text = 'monday at 6am';
      assert.throws(() => {
        parseTime(text);
      }, 'Invalid frequency, expected "everyday" or "every workday" keywords');
    });
  });

  describe('parseTimeRange', function() {
    it('should split the text into period and count fields', function() {
      const text = 'for 4 weeks';
      const expected = {
        period: 'week',
        count: '4'
      };
      const result = parseTimeRange(text);
      assert.deepEqual(result, expected);
    });

    it('should throw if both period and count are not present', function() {
      const text = 'for tomorrow';
      assert.throws(() => {
        parseTimeRange(text);
      }, 'could not find " "');
    });
  });
});
