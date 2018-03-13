const assert = require('assert');
const { split, splitBy, splitAt, splitUsernames } = require('./helpers');

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

  describe('splitAt', function() {
    it('should split the text and trim the each segment', function() {
      const text = '@alireza.eva.u23 everyday at 6am';
      const expected = ['@alireza.eva.u23', 'everyday at 6am'];
      const result = splitAt(text, 'every');
      assert.deepEqual(result, expected);
    });

    it('should throw if the separator does not exists', function() {
      const text = 'a text without a dash';
      assert.throws(() => {
        splitAt(text, '-');
      }, 'could not find "-"');
    });
  });

  describe('splitUsernames', function() {
    it('should split the usernames by ","', function() {
      const text = '@alireza.eva.u23, me';
      const expected = ['@alireza.eva.u23', 'me'];
      const result = splitUsernames(text);
      assert.deepEqual(result, expected);
    });

    it('should split the usernames by " "', function() {
      const text = '@alireza.eva.u23  me';
      const expected = ['@alireza.eva.u23', 'me'];
      const result = splitUsernames(text);
      assert.deepEqual(result, expected);
    });

    it('should handle "and"', function() {
      const text = '@alireza.eva.u23, and  me';
      const expected = ['@alireza.eva.u23', 'me'];
      const result = splitUsernames(text);
      assert.deepEqual(result, expected);
    });
  });
});
