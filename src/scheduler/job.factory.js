const { stripIndent } = require('common-tags');

module.exports = (getEvent, getSecret, notifyUsers, isBefore, logger) => (
  team_id,
  event_id
) => {
  async function notifyActiveMembers(fireDate) {
    // we are expecting the fireDate to be moment.js date object
    const { url: eventUrl, event_id: eventName, members } = await getEvent(
      team_id,
      event_id
    );

    const { access_token } = await getSecret(team_id);

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

    return notifyUsers(
      team_id,
      access_token,
      activeMembers,
      eventName,
      eventUrl,
      fireDate.format('YYYYMMDD')
    );
  }

  return fireDate =>
    notifyActiveMembers(fireDate).catch(err =>
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
