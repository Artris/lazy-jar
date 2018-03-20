module.exports = (eventExists, mapUsernameToIDs, START) => {
    return (parsedCommand, usernameToIds, myUserId, events) => {
        const {
            name,
            username
        } = parsedCommand;
        eventExists(name, events);
        return {
            type: START,
            event: name,
            userId: mapUsernameToIDs([username], usernameToIds, myUserId).pop()
        };
    };
};