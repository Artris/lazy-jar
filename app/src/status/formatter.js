module.exports = ({
  eventStatus,
  memberStatus
}, userIdToUsername) => {

  const membersWithID = [...memberStatus.values()]
    .filter(member => userIdToUsername.has(member.id));

  const memberStats = membersWithID.sort(compareParticipationRate)
    .map((member) => getMemberStats(member, userIdToUsername));

  const eventStats = [...eventStatus.values()]
    .sort(compareParticipationRate).map(getEventStats);

  return {
    memberStats,
    eventStats
  }
};

function getMemberStats(member, userIdToUsername) {
  const name = userIdToUsername.get(member.id);
  const totalMeetingsMissed = member.notified - member.participated;
  const meetingsMissedCurrentMonth = member.notifiedCurrentMonth - member.participatedCurrentMonth;
  const meetingsMissedCurrentWeek = member.notifiedCurrentWeek - member.participatedCurrentWeek;
  const overall_participation_rate = getParticipationRate(member);

  return {
    name,
    meetingsMissedCurrentMonth,
    meetingsMissedCurrentWeek,
    totalMeetingsMissed,
    overall_participation_rate
  }
}

function getEventStats(event) {
  const event_name = event.event_id;
  const event_participation_rate = getParticipationRate(event);

  return {
    event_name,
    event_participation_rate
  }
}

function compareParticipationRate(a, b) {
  return getParticipationRate(a) >= getParticipationRate(b);
}

function getParticipationRate(x) {
  return Math.floor(x.participated * 100 / x.notified);
}