module.exports = (splitBy, SKIP) => {
  return command => {
    const withoutInfix = command.replace(' will skip ', ' ');
    const [username, name, period] = splitBy(withoutInfix, [' ', 'for']);

    return {
      type: SKIP,
      for: period,
      username,
      name
    };
  };
};
