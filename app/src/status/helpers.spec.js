const moment = require('moment');
const assert = require('assert');
const {
    occuredWithinCurrentWeek,
    occuredWithinCurrentMonth
} = require('./helpers');

describe('status helpers', function () {
    describe('occuredWithinCurrentWeek', function () {
        it('should return true given a date within the current week', function () {
            const date_today = moment().toDate();
            const now = moment();
            assert(occuredWithinCurrentWeek(now, date_today));
        });
        it('should return false given a date not within the current week', function () {
            const now = moment();
            assert(!occuredWithinCurrentWeek(now, '20170301'))
        });
    })
    describe('occuredWithinCurrentMonth', function () {
        it('should return true given a date within the current month', function () {
            const date_today = moment().toDate()
            assert(occuredWithinCurrentMonth(moment(), date_today))
        });
        it('should return false given a date not within the current month', function () {
            assert(!occuredWithinCurrentMonth(moment(), '20170301'))
        });
    })
});
