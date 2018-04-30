module.exports = (info, userIdToUsername) => {
  return [...info.values()]
    .filter(member => userIdToUsername.has(member.id))
    .sort((a, b) => a.participated / a.notified >= b.participated / b.notified)
    .map(member => {
      const name = userIdToUsername.get(member.id);
      const missed = member.notified - member.participated;
      const participation_rate = Math.floor(
        member.participated * 100 / member.notified
      );
      return `${name} has missed ${missed} meetings, ${participation_rate}% participation rate`;
    })
    .join('\n');
};
