const chai = require('chai');
const expect = chai.expect;

const format = require('./formatter');

describe('formatter', function () {
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
        eventStatus: new Map([
            ['lazy-jar', {
                event_id: 'lazy-jar',
                notified: 22,
                participated: 11
            }, ]
        ])
    }

    it('should order members based on their participation rate in an ascending order', function () {
        const userIdToUsername = new Map([
            ['@eva_id', 'eva'],
            ['@grace_id', 'grace'],
            ['@dt_id', 'dt']
        ]);

        const expected = [{
                name: 'eva',
                meetingsMissedCurrentMonth: 1,
                meetingsMissedCurrentWeek: 0,
                totalMeetingsMissed: 2,
                overall_participation_rate: 80
            },
            {
                name: 'dt',
                meetingsMissedCurrentMonth: 1,
                meetingsMissedCurrentWeek: 0,
                totalMeetingsMissed: 1,
                overall_participation_rate: 90
            },
            {
                name: 'grace',
                meetingsMissedCurrentMonth: 0,
                meetingsMissedCurrentWeek: 0,
                totalMeetingsMissed: 0,
                overall_participation_rate: 100
            }
        ]
        const result = format(info, userIdToUsername);
        expect(result.memberStats).to.deep.equals(expected);
    });

    it('should drop the members with missing username', function () {
        const userIdToUsername = new Map([
            ['@grace_id', 'grace'],
            ['@dt_id', 'dt']
        ]);

        const expected = [{
                name: 'dt',
                meetingsMissedCurrentMonth: 1,
                meetingsMissedCurrentWeek: 0,
                totalMeetingsMissed: 1,
                overall_participation_rate: 90
            },
            {
                name: 'grace',
                meetingsMissedCurrentMonth: 0,
                meetingsMissedCurrentWeek: 0,
                totalMeetingsMissed: 0,
                overall_participation_rate: 100
            }
        ]
        const result = format(info, userIdToUsername);
        expect(result.memberStats).to.deep.equals(expected);
    });

    it('should calculate correct event participation rate', function () {
        const userIdToUsername = new Map([
            ['@grace_id', 'grace'],
            ['@dt_id', 'dt']
        ]);

        const expected = [{
            event_name: "lazy-jar",
            event_participation_rate: 50
        }]
        const result = format(info, userIdToUsername);
        expect(result.eventStats).to.deep.equals(expected);
    });
});