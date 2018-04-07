const assert = require('assert');
const {
    saveSecrets,
    returnSecrets,
    saveState,
    returnEventsByTeamId,
    returnState,
    saveLogs,
    returnLogs
} = require('./helpers.js');
const {
    State,
    Secret,
    Notification
} = require('../models/models.js') /*required to clear the database*/

describe('database helper functions', function () {

    describe('secrets', function () {
        afterEach(() => {
            /*clear the secret collection*/
            Secret.remove(() => {});
        })

        let request = {
            team_id: "12345",
            access_token: "23dsdf3",
            bot_user_id: "waitforme",
            bot_access_token: "3dher"
        }

        it('should correctly return the newly saved secret', async () => {
            const result = await saveSecrets(request)
            let theResult = {
                team_id: result.team_id,
                access_token: result.access_token,
                bot_user_id: result.bot.bot_user_id,
                bot_access_token: result.bot.bot_access_token
            }
            assert.deepEqual(theResult, request);
        });

        it('should correctly return the secret for a team_id', async () => {
            await saveSecrets(request)
            let result = await returnSecrets(request);
            result = result.pop();
            let resultingData = {
                team_id: result.team_id,
                access_token: result.access_token,
                bot_user_id: result.bot.bot_user_id,
                bot_access_token: result.bot.bot_access_token
            }
            assert.deepEqual(resultingData, request);
        });

        it('should only save one secret with the same team_id', async () => {
            await saveSecrets(request);
            const modifiedRequest = {
                team_id: "12345",
                access_token: "23dsdf3",
                bot_user_id: "waitforme",
                bot_access_token: "xxx"
            }
            await saveSecrets(request);
            const result = await returnSecrets(modifiedRequest);
            assert.deepEqual(1, result.length);
        });
    });

    describe('state', function () {
        afterEach(() => {
            /*clear the state collection*/
            State.remove(() => {});
        })

        const members = [{
            user_id: "12345",
            ignore: false,
            skip_until: 'mmyydd'
        }]
        const time = {
            hh: 6,
            mm: 30,
            zone: "UTC"
        }
        const artris = {
            team_id: '12345',
            event_id: 'artris',
            time_to_respond: 900,
            members,
            frequency: 'Weekdays',
            time,
            halted: false
        }

        const lazyJar = {
            team_id: '12345',
            event_id: 'lazy-jar',
            time_to_respond: 900,
            members,
            frequency: 'Weekdays',
            time,
            halted: false
        }

        it('should correctly return the newly saved state', async () => {
            const result = await saveState(lazyJar);
            /*Only asserting id is returned*/
            assert.deepEqual(result.team_id, lazyJar.team_id);
        })


        it('should correctly only save one state for a team_id and event_id', async () => {
            await saveState(lazyJar)
            await saveState(lazyJar)
            const result = await returnState({
                team_id: lazyJar.team_id,
                event_id: lazyJar.event_id
            })
            assert.deepEqual(result.length, 1)
        });

        it('should overwrite a previous state with a team_id and event_id with a new state passed in', async () => {
            const modifiedLazyJar = {
                team_id: '12345',
                event_id: 'lazy-jar',
                time_to_respond: 900,
                members,
                frequency: 'Everyday',
                time,
                halted: false
            }
            await saveState(lazyJar)
            const result = await saveState(modifiedLazyJar)
            /*fetch the state to check if it was saved with the modified frequency*/
            const newState = await returnState({
                team_id: lazyJar.team_id,
                event_id: lazyJar.event_id
            })
            assert.deepEqual(newState.pop().frequency, modifiedLazyJar.frequency)
        })

        it('should correctly return the a list of events for a team_id', async () => {
            /*save events to database*/
            await saveState(artris)
            await saveState(lazyJar)
            const result = await returnEventsByTeamId({
                team_id: '12345'
            })
            const expected = ['artris', 'lazy-jar']
            assert.deepEqual(result, expected)
        });

        it('should correctly return the a state given a team_id', async () => {
            await saveState(artris)
            const result = await returnState({
                team_id: artris.team_id
            })
            assert(result.pop().team_id)
        });
    });
    
    describe('logs', () =>{
        afterEach(() => {
            /*clear the state collection*/
            Notification.remove(() => {});
        })
        const example_log = {
            team_id: "wild_one",
            event_id: "gone_too_far",
            user_id: "we_up_all_night",
            date: "2018-12-12",
            action: "Notefied"
        }
        const example_log2 = {
            team_id: "wild_one",
            event_id: "gone_too_far",
            user_id: "we_up_all_night",
            date: "2018-12-12",
            action: "Participated"    
        }

        it("should save the log to the database", async () => {
            let result = await saveLogs(example_log);
            // TODO: refactor the result back to object literal.
            const modifiedResult = {
                team_id: result.team_id,
                event_id: result.event_id,
                user_id: result.user_id,
                date: result.date,
                action: result.action
            };
            assert.deepEqual(modifiedResult, example_log);
        })

        it("should only save one copy of the logs when the same primary key(the whole object) is used", async () => {
            await saveLogs(example_log);
            await saveLogs(example_log);
            let result = await returnLogs({team_id:example_log.team_id, event_id:example_log.event_id});
            assert.deepEqual(result.length, 1);
        })

        it("should return all saved logs that match the {team_id, event_id}", async () => {
            await saveLogs(example_log);
            await saveLogs(example_log2);
            let result = await returnLogs({team_id:example_log.team_id, event_id:example_log.event_id});
            assert.deepEqual(result.length,2);
        })
    })
});


