const { stripIndent } = require('common-tags');

module.exports = (getEvent, notifyUsers, isBefore, logger) => (
  team_id,
  event_id
) => fireDate => {
  return getEvent(team_id, event_id)
    .then(event => {
      const activeMembersId = event.members
        .filter(({ ignore, skip_until }) => {
          const notActive = ignore === true;
          const isOnBreak = isBefore(fireDate, skip_until);
          return !(notActive || isOnBreak);
        })
        .map(member => member.id);
      return activeMembersId;
    })
    .then(activeMembersId => {
      return notifyUsers(team_id, activeMembersId);
    })
    .catch(err =>
      logger.log({
        level: 'error',
        message: stripIndent`
          failed to execute a job
          team_id:  ${team_id}
          event_id: ${event_id}
          error:    ${err}
        `
      })
    );
};
