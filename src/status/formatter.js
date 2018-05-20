module.exports = ({ eventStatus, memberStatus }, userIdToUsername) => {
  console.log(memberStatus);
  
  return [...memberStatus.values()]
    .filter(member => userIdToUsername.has(member.id))
    .sort((a, b) => a.participated / a.notified >= b.participated / b.notified)
    .map(member => {
      const name = userIdToUsername.get(member.id);
      const missed = member.notified - member.participated;
      const meetingsMissedCurrentMonth = member.notifiedCurrentMonth - member.participatedCurrentMonth
      const meetingsMissedCurrentWeek = member.notifiedCurrentWeek - member.participatedCurrentWeek
      const participation_rate = Math.floor(
        member.participated * 100 / member.notified
      );
      return `${name} has missed:
        This month: ${meetingsMissedCurrentMonth} meetings
        This week:  ${meetingsMissedCurrentWeek} meetings
        In total: ${missed} meetings
        Participation rate: ${participation_rate}%\n`;
    })
    .concat(
      [...eventStatus.values()]
      .sort((a, b) => a.participated / a.notified >= b.participated / b.notified)
      .map(event => {
        const event_name = event.event_id;
        const event_participation_rate = Math.floor(
        event.participated * 100 / event.notified
        );
        return `${event_name} has a ${event_participation_rate}% participation rate.`;
      })
      )
    .join('\n')
};
