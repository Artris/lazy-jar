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

  function getAllEventIds(events) {
    return [...new Set(events.map(n => n.event_id))];
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

  function allTimeEventStatus(events) {
    const eventIds = getAllEventIds(events);
    const eventStatus = initializeEventStatus(eventIds);
    events.forEach(({ event_id, action }) => {
      const status = eventStatus.get(event_id);
      if (action === 'Participated') status.participated += 1;
      if (action === 'Notified') status.notified += 1;
    });
    return eventStatus;
  } 

  return team_id =>
    logProvider({ team_id })
    .then(notifications => {
      const eventStatus = allTimeEventStatus(notifications)
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
};
