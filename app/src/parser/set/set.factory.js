module.exports = (split, SET) => {
    return command => {
        const withoutPrefix = command.slice('set url for '.length);
        const [who, to] = split(withoutPrefix, ' to ');
        return {
            type: SET,
            who,
            to
        };
    };
};
