module.exports = (splitBy, START) => {
    return command => {
        const withoutPrefix = command.slice('start notifying '.length);
        const [username, name] = splitBy(withoutPrefix, [' for ']);

        return {
            type: START,
            username,
            name
        };
    };
};