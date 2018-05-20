const { stripIndent } = require('common-tags');
const moment = require('moment');

/**
 * Generates a simple status message based the Logs
 * @param {(team_id) -> Notification list} logProvider
 * @param logger responds to `.log` method
 */
 
 /*http://momentjscom.readthedocs.io/en/latest/moment/07-customization/11-calendar-format/*/
 function occuredWithinCurrentWeek(date) {
      /*TODO: add timezone*/
    const now = moment();
    const then = moment(date, "YYYYMMDD");
    
    
    return now.format("W") === then.format("W");
 }
 
 function occuredWithinCurrentMonth(date) {
         /*TODO: add timezone*/
    const now = moment();
    const then = moment(date, "YYYYMMDD");
    return (now.format("M") === then.format("M")) &&
    (now.format("YY") === then.format("YY"));

 }
 
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
          participated: 0,
          notifiedCurrentWeek: 0,
          participatedCurrentWeek: 0,
          notifiedCurrentMonth: 0,
          participatedCurrentMonth: 0
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
    const memberStatus = initializeMemberStatus(memberIds);
    notifications.forEach(({ user_id, action, date }) => {
      const status = memberStatus.get(user_id);
      if (action === 'Participated') status.participated += 1;
      if (action === 'Notified') status.notified += 1;
      if (occuredWithinCurrentWeek(date)  && action === 'Participated') status.participatedCurrentWeek += 1;
      if (occuredWithinCurrentWeek(date)  && action === 'Notified') status.notifiedCurrentWeek += 1;
      if (occuredWithinCurrentMonth(date) && action === 'Participated') status.participatedCurrentMonth += 1;
      if (occuredWithinCurrentMonth(date) && action === 'Notified') status.notifiedCurrentMonth += 1;
    });
    return memberStatus;
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
      console.log(notifications)
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
