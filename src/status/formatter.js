module.exports = ({ eventStatus, memberStatus }, userIdToUsername) => {
//   console.log("USERIDTOUSERNAME", userIdToUsername);

  const membersWithID = [...memberStatus.values()]
    .filter(member => userIdToUsername.has(member.id));
    
  const memberStats = membersWithID.sort(compareParticipationRate)
    .map((member) => getMemberStats(member, userIdToUsername));
  
  const eventStats = [...eventStatus.values()]
    .sort(compareParticipationRate).map(getEventStats);
  
  return memberStats.concat(eventStats).join("\n");
};

// helpers
function getMemberStats (member, userIdToUsername) {
  // console.log("USERIDTOUSERNAME", userIdToUsername);
  const name = userIdToUsername.get(member.id);
//   console.log("NAME",name);
  const totalMeetingsMissed = member.notified - member.participated;
  const meetingsMissedCurrentMonth = member.notifiedCurrentMonth - member.participatedCurrentMonth;
  const meetingsMissedCurrentWeek  = member.notifiedCurrentWeek - member.participatedCurrentWeek;
  const overall_participation_rate = getParticipationRate(member);
  
   return `${name} has missed:
        This month: ${meetingsMissedCurrentMonth} meetings
        This week:  ${meetingsMissedCurrentWeek} meetings
        In total: ${totalMeetingsMissed} meetings
        Participation rate: ${overall_participation_rate}%`;
}
  
function getEventStats (event) {
    const event_name = event.event_id;
    const event_participation_rate = getParticipationRate(event);
    
    return `${event_name} has a ${event_participation_rate}% participation rate.\n`;
}
  
function compareParticipationRate (a,b) {
  return getParticipationRate(a) >= getParticipationRate(b);
}

function getParticipationRate(x) {
  return Math.floor(x.participated * 100 / x.notified);
}
