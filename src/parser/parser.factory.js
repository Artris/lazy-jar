module.exports = (
  split,
  parseScheduleCommand,
  parseAddCommand,
  parseRemoveCommand,
  parseMoveCommand,
  parseSkipCommand,
  parseStatusCommand,
  parseHaltCommand,
  parseResumeCommand,
  parseTerminateCommand
) => {
  return command => {
    if (command.trim() == 'status') return parseStatusCommand(command);

    const [type, message] = split(command);
    switch (type) {
      case 'schedule':
        return parseScheduleCommand(command);
      case 'move':
        return parseMoveCommand(command);
      case 'add':
        return parseAddCommand(command);
      case 'remove':
        return parseRemoveCommand(command);
      case 'halt':
        return parseHaltCommand(command);
      case 'resume':
        return parseResumeCommand(command);
      case 'terminate':
        return parseTerminateCommand(command);
      default:
        const isSkipCommand = command.indexOf(' will skip ') !== -1;
        if (isSkipCommand) return parseSkipCommand(command);
        throw Error('unkown command');
    }
  };
};
