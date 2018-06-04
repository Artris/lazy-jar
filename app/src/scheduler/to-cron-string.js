const frequencyToCronStringMap = new Map([
  ['EVERYDAY', '*'],
  ['WEEKDAYS', '1-5'],
  ['WEEKENDS', '6,7'],
  ['MONDAYS', '1'],
  ['TUESDAYS', '2'],
  ['WEDNESDAYS', '3'],
  ['THURSDAYS', '4'],
  ['FRIDAYS', '5'],
  ['SATURDAYS', '6'],
  ['SUNDAYS', '7']
]);

const freqToCronString = frequency => {
  const isValidFrequency = frequencyToCronStringMap.has(frequency);
  if (isValidFrequency) {
    return frequencyToCronStringMap.get(frequency);
  } else {
    throw Error(`Invalid Frequency: ${frequency}`);
  }
};

const timeToCronString = time => {
  const { hh, mm } = time;
  return `${mm} ${hh}`;
};

module.exports = ({ frequency, time }) => {
  const mmhh = timeToCronString(time);
  const dayOfWeek = freqToCronString(frequency);
  return `0 ${mmhh} * * ${dayOfWeek}`;
};
