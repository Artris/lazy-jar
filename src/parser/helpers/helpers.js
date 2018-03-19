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

function splitAt(text, separator) {
  const indexOfSeparator = text.indexOf(separator);
  if (indexOfSeparator === -1) {
    throw Error(`could not find "${separator}"`);
  }

  return [
    text.slice(0, indexOfSeparator).trim(),
    text.slice(indexOfSeparator).trim()
  ];
}

function splitUsernames(text) {
  return text
    .replace(/,/g, ' ')
    .replace(/and/g, ' ')
    .split(/\s+/);
}

module.exports = { split, splitBy, splitAt, splitUsernames };
