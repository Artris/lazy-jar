const { stripIndent } = require('common-tags');

/**
 * Generates a simple status message based the Logs
 * @param {(team_id) -> Notification list} logProvider
 * @param logger responds to `.log` method
 */
module.exports = (logProvider, logger) => {
  function getAllMemberIds(notifications) {
    return [...new Set(notifications.map(n => n.user_id))];
  }

  function initializeMemberStatus(memberIds) {
    return new Map(
      memberIds.map(id => [
        id,
        {
          id,
          notified: 0,
          participated: 0
        }
      ])
    );
  }

  function allTimeMemberStatus(notifications) {
    const memberIds = getAllMemberIds(notifications);
    const memeberStatus = initializeMemberStatus(memberIds);
    notifications.forEach(({ user_id, action }) => {
      const status = memeberStatus.get(user_id);
      if (action === 'Participated') status.participated += 1;
      if (action === 'Notified') status.notified += 1;
    });
    return memeberStatus;
  }

  return team_id =>
    logProvider(team_id)
      .then(notifications => allTimeMemberStatus(notifications))
      .catch(err => {
        console.log(err);
        logger.log({
          level: 'error',
          message: stripIndent`
                        failed to calculat the status for
                        team_id:  ${team_id}
                        error:    ${err}
                      `
        });
        throw err;
      });
};
