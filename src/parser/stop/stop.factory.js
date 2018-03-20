module.exports = (splitBy, STOP) => {
    return command => {
        const withoutPrefix = command.slice('stop notifying '.length);
        const [username, name] = splitBy(withoutPrefix, [' for ']);

        return {
            type: STOP,
            username,
            name
        };
    };
};