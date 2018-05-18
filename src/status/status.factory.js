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
<<<<<<< HEAD
=======

  function getAllEventIds(events) {
    return [...new Set(events.map(n => n.event_id))];
  }
>>>>>>> 2872545... Updated Status

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

<<<<<<< HEAD
=======
  function initializeEventStatus(eventIds) {
    return new Map(
      eventIds.map(event_id => [
        event_id,
        {
          event_id,
          notified: 0,
          participated: 0
        }
      ])
    );
  }

>>>>>>> 2872545... Updated Status
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
    logProvider({ team_id })
<<<<<<< HEAD
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
=======
    .then(notifications => {
      const eventStatus = eventMemberStatus(notifications)
      const memberStatus = allTimeMemberStatus(notifications)
      return { eventStatus, memberStatus }
    })
    .catch(err => {
      console.log(err);
      logger.log({
        level: 'error',
        message: stripIndent `
                        failed to calculate the status for
                        team_id:  ${team_id}
                        error:    ${err}
                        `
      });
      throw err;
    });
>>>>>>> 2872545... Updated Status
};
