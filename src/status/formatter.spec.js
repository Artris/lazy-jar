const chai = require('chai');
const expect = chai.expect;

const format = require('./formatter');

describe('formatter', function() {
  const info = new Map([
    ['@eva_id', { id: '@eva_id', participated: 8, notified: 10 }],
    ['@grace_id', { id: '@grace_id', participated: 10, notified: 10 }],
    ['@dt_id', { id: '@dt_id', participated: 9, notified: 10 }]
  ]);

  it('should order members based on their participation rate in an ascending order', function() {
    const userIdToUsername = new Map([
      ['@eva_id', 'eva'],
      ['@grace_id', 'grace'],
      ['@dt_id', 'dt']
    ]);

    const expected = [
      'eva has missed 2 meetings, 80% participation rate',
      'dt has missed 1 meetings, 90% participation rate',
      'grace has missed 0 meetings, 100% participation rate'
    ].join('\n');

    const result = format(info, userIdToUsername);
    expect(result).to.equals(expected);
  });

  it('should drop the members with missing username', function() {
    const userIdToUsername = new Map([
      ['@grace_id', 'grace'],
      ['@dt_id', 'dt']
    ]);

    const expected = [
      'dt has missed 1 meetings, 90% participation rate',
      'grace has missed 0 meetings, 100% participation rate'
    ].join('\n');

    const result = format(info, userIdToUsername);
    expect(result).to.equals(expected);
  });
});
