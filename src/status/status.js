const {
    occuredWithinCurrentWeek,
    occuredWithinCurrentMonth
} = require('./helpers');

const moment = require('moment');

module.exports = (logProvider, logger) => require('./status.factory')(logProvider, logger, occuredWithinCurrentWeek, occuredWithinCurrentMonth, moment);