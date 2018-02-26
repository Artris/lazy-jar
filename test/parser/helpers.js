const assert = require('assert');
const { split, parseTime } = require('../../parser/helpers');
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

    it('should return the text as the first element when separator does not exists', function() {
      const text = 'a text without a dash';
      const expected = ['a text without a dash', undefined];
      const result = split(text, '-');
      assert.deepEqual(result, expected);
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
  });
});
