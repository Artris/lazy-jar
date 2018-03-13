const assert = require('assert');
const {
    remove
} = require('../../src/actions/remove');
const {
    REMOVE
} = require('../../src/commands');

describe('remove action', function () {
    it('should correctly return remove action', function () {
        const events = new Set(['artris', 'lazy-jar'])
        const myUserId = 2
        const usernameToIds = new Map([
            ['@dtoki', 0],
            ['@alireza.eva.u23', 1],
            ['@grace', 2]
        ])
        const parsedCommand = {
            type: REMOVE,
            event: 'artris',
            usernames: ['me']
        };
        const expected = {
            type: REMOVE,
            event: 'artris',
            userIds: [2]
        };
        const result = remove(parsedCommand, usernameToIds, myUserId, events);
        assert.deepEqual(result, expected);
    });

    it('should throw an error given an event that does not exist', function () {
        const events = new Set(['lazy-jar'])
        const myUserId = 2
        const usernameToIds = new Map([
            ['@dtoki', 0],
            ['@alireza.eva.u23', 1],
            ['@grace', 2]
        ])
        const parsedCommand = {
            type: REMOVE,
            event: 'artris',
            usernames: ['me']
        };
        assert.throws(() => remove(parsedCommand, usernameToIds, myUserId, events), /the project specified does not exist/)
    })

    it('should throw an error given a username that does not exist', function () {
        const events = new Set(['artris', 'lazy-jar'])
        const myUserId = 0
        const usernameToIds = new Map([
            ['@dtoki', 0],
            ['@alireza.eva.u23', 1],
        ])
        const parsedCommand = {
            type: REMOVE,
            event: 'artris',
            usernames: ['@grace']
        };
        assert.throws(() => remove(parsedCommand, usernameToIds, myUserId, events), /the user @grace does not exist/)
    })
});