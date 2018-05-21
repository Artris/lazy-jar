const moment = require('moment');
const assert = require('assert');
const {
    occuredWithinCurrentWeek,
    occuredWithinCurrentMonth
} = require('./helpers')

describe('status helpers', function () {
    describe('occuredWithinCurrentWeek', function () {
        it('should return true given a date within the current week', function () {
            const date_today = moment().toDate()
            assert(occuredWithinCurrentWeek(date_today))
        });
        it('should return false given a date not within the current week', function () {
            assert(!occuredWithinCurrentWeek('20170301'))
        });
    })
    describe('occuredWithinCurrentMonth', function () {
        it('should return true given a date within the current month', function () {
            const date_today = moment().toDate()
            assert(occuredWithinCurrentMonth(date_today))
        });
        it('should return false given a date not within the current month', function () {
            assert(!occuredWithinCurrentMonth('20170301'))
        });
    })
});
