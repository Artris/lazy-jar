const { stripIndent } = require('common-tags');
const moment = require('moment');

module.exports = (getEvent, getSecret, notifyUsers, isBefore, logger) => (
  team_id,
  event_id
) => {
  async function notifyActiveMembers(fireDate) {
    const { url: eventUrl, event_id: eventName, members } = await getEvent({
      team_id,
      event_id
    });

    const secret = await getSecret({ team_id });
    const bot_access_token = secret.bot.bot_access_token;
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

    const fireDateStr = moment(fireDate)
      .utc()
      .format('YYYYMMDD');

    return notifyUsers(
      team_id,
      bot_access_token,
      activeMembers,
      eventName,
      eventUrl,
      fireDateStr
    );
  }

  return fireDate => {
    return notifyActiveMembers(fireDate).catch(err =>
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
};
