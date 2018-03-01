const { weekdays, workdays } = require('./constants');

/**
 * Splits the text into two segments, before and after the separator.
 * Note the before and after segments are trimmed.
 * @param {String} text
 * @param {String} separator
 */
function split(text, separator = ' ') {
  const indexOfSeparator = text.indexOf(separator);
  if (indexOfSeparator === -1) {
    throw Error(`could not find "${separator}"`);
  }
  return [
    text.slice(0, indexOfSeparator).trim(),
    text.slice(indexOfSeparator + separator.length).trim()
  ];
}

/**
 * Splits the text into segments separated by the list of separators
 * Note that each segment is trimmed.
 * @param {String} text
 * @param {List[String]} separators
 */
function splitBy(text, separators) {
  let rest = text;
  let result = [];
  for (let separator of separators) {
    const [left, right] = split(rest, separator);
    result.push(left);
    rest = right;
  }
  result.push(rest);
  return result;
}

function toWeekdays(identifier) {
  switch (identifier) {
    case 'day':
      return weekdays;
    case 'workday':
      return workdays;
    default:
      throw Error(
        'Invalid frequency, expected "everyday" or "every workday" keywords'
      );
  }
}

function parseTime(text) {
  const withoutPrefix = text.replace('every', '');
  const specifiesDays = withoutPrefix.indexOf(' at ') !== -1;
  if (specifiesDays) {
    const [frequencyIdentifier, time] = split(withoutPrefix, ' at ');
    const weekdays = toWeekdays(frequencyIdentifier);

    return {
      weekdays,
      time
    };
  } else {
    return {
      time: withoutPrefix
    };
  }
}

function parseTimeRange(text) {
  const withoutPrefix = text.replace('for', '').trim();
  const [count, period] = split(withoutPrefix, ' ');
  return {
    count,
    period: period.slice(-1) === 's' ? period.slice(0, -1) : period
  };
}

module.exports = { split, splitBy, parseTime, parseTimeRange };
