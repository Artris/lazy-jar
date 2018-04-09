const assert = require('assert');

const {
  saveSecret,
  saveState,
  saveLog,
  getSecret,
  getState,
  getLogsForEvent,
  getEventsFor
} = require('./helpers.js');

const {
  State,
  Secret,
  Notification
} = require('../models/models.js'); /*required to clear the database*/

describe('database helper functions', function() {
  describe('secrets', function() {
    afterEach(() => {
      /*clear the secret collection*/
      Secret.remove(() => {});
    });

    let request = {
      team_id: '12345',
      access_token: '23dsdf3',
      bot: {
        bot_user_id: 'waitforme',
        bot_access_token: '3dher'
      }
    };

    it('should correctly return the newly saved secret', async () => {
      const result = await saveSecret(request);
      let theResult = {
        team_id: result.team_id,
        access_token: result.access_token,
        bot: {
          bot_user_id: result.bot.bot_user_id,
          bot_access_token: result.bot.bot_access_token
        }
      };
      assert.deepEqual(theResult, request);
    });

    it('should correctly return the secret for a team_id', async () => {
      await saveSecret(request);
      const result = await getSecret(request);
      const resultingData = {
        team_id: result.team_id,
        access_token: result.access_token,
        bot: {
          bot_user_id: result.bot.bot_user_id,
          bot_access_token: result.bot.bot_access_token
        }
      };
      assert.deepEqual(resultingData, request);
    });

    it('should only save one secret with the same team_id', async () => {
      await saveSecret(request);
      const modifiedRequest = {
        team_id: '12345',
        access_token: '23dsdf3',
        bot: {
          bot_user_id: 'waitforme',
          bot_access_token: 'xxx'
        }
      };
      await saveSecret(request);
      const result = await Secret.find({ team_id: '12345' });
      assert.deepEqual(1, result.length);
    });
  });

  describe('state', function() {
    afterEach(() => {
      /*clear the state collection*/
      State.remove(() => {});
    });

    const members = [
      {
        user_id: '12345',
        user_im_id: 'IM_ID_1',
        ignore: false,
        skip_until: 'mmyydd'
      }
    ];

    const time = {
      hh: 6,
      mm: 30,
      zone: 'UTC'
    };

    const artris = {
      team_id: '12345',
      event_id: 'artris',
      time_to_respond: 900,
      members,
      frequency: 'Weekdays',
      time,
      halted: false
    };

    const lazyJar = {
      team_id: '12345',
      event_id: 'lazy-jar',
      time_to_respond: 900,
      members,
      frequency: 'Weekdays',
      time,
      halted: false
    };

    it('should correctly return the newly saved state', async () => {
      const result = await saveState(lazyJar);
      /*Only asserting id is returned*/
      assert.deepEqual(result.team_id, lazyJar.team_id);
    });

    it('should correctly only save one state for a team_id and event_id', async () => {
      await saveState(lazyJar);
      await saveState(lazyJar);
      const result = await State.find({
        team_id: lazyJar.team_id,
        event_id: lazyJar.event_id
      });
      assert.deepEqual(result.length, 1);
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
      };
      await saveState(lazyJar);
      const result = await saveState(modifiedLazyJar);
      /*fetch the state to check if it was saved with the modified frequency*/
      const newState = await getState({
        team_id: lazyJar.team_id,
        event_id: lazyJar.event_id
      });
      assert.deepEqual(newState.frequency, modifiedLazyJar.frequency);
    });

    it('should correctly return the a list of events for a team_id', async () => {
      /*save events to database*/
      await saveState(artris);
      await saveState(lazyJar);
      const result = await getEventsFor({
        team_id: '12345'
      });
      const expected = ['artris', 'lazy-jar'];
      assert.deepEqual(result.map(e => e.event_id), expected);
    });
  });

  describe('logs', () => {
    afterEach(() => {
      /*clear the state collection*/
      Notification.remove(() => {});
    });
    const example_log = {
      team_id: 'wild_one',
      event_id: 'gone_too_far',
      user_id: 'we_up_all_night',
      date: '2018-12-12',
      action: 'Notefied'
    };
    const example_log2 = {
      team_id: 'wild_one',
      event_id: 'gone_too_far',
      user_id: 'we_up_all_night',
      date: '2018-12-12',
      action: 'Participated'
    };

    it('should save the log to the database', async () => {
      let result = await saveLog(example_log);
      // TODO: refactor the result back to object literal.
      const modifiedResult = {
        team_id: result.team_id,
        event_id: result.event_id,
        user_id: result.user_id,
        date: result.date,
        action: result.action
      };
      assert.deepEqual(modifiedResult, example_log);
    });

    it('should only save one copy of the logs when the same primary key(the whole object) is used', async () => {
      await saveLog(example_log);
      await saveLog(example_log);
      let result = await getLogsForEvent({
        team_id: example_log.team_id,
        event_id: example_log.event_id
      });
      assert.deepEqual(result.length, 1);
    });

    it('should return all saved logs that match the {team_id, event_id}', async () => {
      await saveLog(example_log);
      await saveLog(example_log2);
      let result = await getLogsForEvent({
        team_id: example_log.team_id,
        event_id: example_log.event_id
      });
      assert.deepEqual(result.length, 2);
    });
  });
});
