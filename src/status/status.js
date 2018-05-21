const {
    occuredWithinCurrentWeek,
    occuredWithinCurrentMonth
} = require('./helpers')

module.exports = (logProvider, logger) => require('./status.factory')(logProvider, logger, occuredWithinCurrentWeek, occuredWithinCurrentMonth)