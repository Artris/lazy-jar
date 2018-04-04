const { stripIndent } = require('common-tags');

module.exports = (getEvent, notifyUsers, isBefore, logger) => (
  team_id,
  event_id
) => fireDate => {
  return getEvent(team_id, event_id)
    .then(({ url: eventUrl, event_id: eventName, members }) => {
      const activeMembers = members
        .filter(({ ignore, skip_until }) => {
          const notActive = ignore === true;
          const isOnBreak = isBefore(fireDate, skip_until);
          return !(notActive || isOnBreak);
        })
        .map(member => {
          const { user_id, user_im_id } = member;
          return { user_id, user_im_id };
        });
      return notifyUsers(team_id, activeMembers, eventName, eventUrl);
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
