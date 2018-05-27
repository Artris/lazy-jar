const chai = require('chai');
const expect = chai.expect;

const format = require('./formatter');

describe('formatter', function() {
 const info = {
    memberStatus: new Map([
        ['@eva_id', {
            id: '@eva_id',
            participated: 8,
            notified: 10,
            notifiedCurrentWeek: 2,
            participatedCurrentWeek: 2,
            notifiedCurrentMonth: 8,
            participatedCurrentMonth: 7
        }],
        ['@grace_id', {
            id: '@grace_id',
            participated: 10,
            notified: 10,
            notifiedCurrentWeek: 2,
            participatedCurrentWeek: 2,
            notifiedCurrentMonth: 3,
            participatedCurrentMonth: 3
        }],
        ['@dt_id', {
            id: '@dt_id',
            participated: 9,
            notified: 10,
            notifiedCurrentWeek: 2,
            participatedCurrentWeek: 2,
            notifiedCurrentMonth: 4,
            participatedCurrentMonth: 3
        }]
    ]),
    eventStatus: new Map()
}

  it('should order members based on their participation rate in an ascending order', function() {
    const userIdToUsername = new Map([
      ['@eva_id', 'eva'],
      ['@grace_id', 'grace'],
      ['@dt_id', 'dt']
    ]);

    const expected = [
    `eva has missed:
        This month: 1 meetings
        This week:  0 meetings
        In total: 2 meetings
        Participation rate: 80%`,
    `dt has missed:
        This month: 1 meetings
        This week:  0 meetings
        In total: 1 meetings
        Participation rate: 90%`,
    `grace has missed:
        This month: 0 meetings
        This week:  0 meetings
        In total: 0 meetings
        Participation rate: 100%`
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
    `dt has missed:
        This month: 1 meetings
        This week:  0 meetings
        In total: 1 meetings
        Participation rate: 90%`,
    `grace has missed:
        This month: 0 meetings
        This week:  0 meetings
        In total: 0 meetings
        Participation rate: 100%`
    ].join('\n');

    const result = format(info, userIdToUsername);
    expect(result).to.equals(expected);
  });
});
