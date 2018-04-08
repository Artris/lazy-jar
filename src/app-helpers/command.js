module.exports = function(
  createUsernameToIdMap,
  getEventsFor,
  parser,
  createAction,
  getState,
  lazyJar,
  saveState,
  winston
) {
  async function getUserMap(access_token) {
    try {
      return await createUsernameToIdMap(access_token);
    } catch (e) {
      winston.error(
        `An error occured while creating userName to userId map ${e}`
      );
      throw e;
    }
  }

  async function getTeamEventsSet(team_id) {
    try {
      let events = await getEventsFor({ team_id });
      // the validator accepts a set of events
      return new Set(events.map(e => e.event_id));
    } catch (e) {
      winston.error(
        `An error occured retriving list of events for team from database: ${e}`
      );
      throw e;
    }
  }

  async function interpretCommand(text, userMap, user_id, teamEvents) {
    try {
      const parsedCommand = parser(text);
      const action = createAction(
        parsedCommand,
        userMap,
        user_id,
        teamEvents,
        'UTC'
      );
      return action;
    } catch (e) {
      winston.error(
        `An error occurred while intepreting the user command: ${e}`
      );
      throw e;
    }
  }

  async function getPreviousState(team_id, event_id) {
    let prevState;
    try {
      prevState = await getState({ team_id, event_id });
      // here we need to convert object returned from mongoose to a javascript object
      prevState = prevState === null ? {} : prevState.toObject();
      return prevState;
    } catch (e) {
      winston.error(
        `An error occurred while retrieving the previous state from the database: ${e}`
      );
      throw e;
    }
  }

  async function updateState(action, prevState, team_id) {
    let newState = lazyJar(action, prevState);
    // the reducer does not return a state with the team_id, so we add it here
    newState.team_id = team_id;
    try {
      await saveState(newState);
      return newState;
    } catch (e) {
      winston.error(
        `An error occured while updating the state of the database: ${e}`
      );
      throw e;
    }
  }

  return {
    getUserMap,
    getTeamEventsSet,
    interpretCommand,
    getPreviousState,
    updateState
  };
};
