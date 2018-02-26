const { weekdays, workdays } = require('./constants');

/**
 * Splits the text into two segments, before and after the separator.
 * Note the before and after segments are trimmed.
 * @param {String} text
 * @param {String} separator
 */
function split(text, separator = ' ') {
  const firstSeparatorIndex = text.indexOf(separator);
  if (firstSeparatorIndex === -1) {
    return [text, undefined];
  }
  return [
    text.slice(0, firstSeparatorIndex).trim(),
    text.slice(firstSeparatorIndex + separator.length).trim()
  ];
}

function toWeekdays(identifier) {
  switch (identifier) {
    case 'day':
      return weekdays;
    case 'workday':
      return workdays;
    default:
      return [];
  }
}

function parseTime(text) {
  const [frequencyIdentifier, time] = split(text, 'at');
  const weekdays = toWeekdays(frequencyIdentifier);

  return {
    weekdays,
    time
  };
}

module.exports = { split, parseTime };
