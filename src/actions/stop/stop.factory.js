module.exports = (eventExists, mapUsernameToIDs, STOP) => {
    return (parsedCommand, usernameToIds, myUserId, events) => {
        const {
            name,
            username
        } = parsedCommand;
        eventExists(name, events);
        return {
            type: STOP,
            event: name,
            userId: mapUsernameToIDs([username], usernameToIds, myUserId).pop()
        };
    };
};