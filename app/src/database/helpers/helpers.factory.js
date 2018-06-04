module.exports = ({ State, Secret, Notification, Log }) => {
  function saveSecret(secret) {
    const { team_id } = secret;
    return Secret.findOneAndUpdate({ team_id }, secret, {
      new: true,
      upsert: true
    });
  }

  function saveState(state) {
    const { team_id, event_id } = state;
    return State.findOneAndUpdate({ team_id, event_id }, state, {
      new: true,
      upsert: true
    });
  }

  function saveLog({ team_id, event_id, user_id, date, action }) {
    return Notification.findOneAndUpdate(
      { team_id, event_id, user_id, date, action },
      { team_id, event_id, user_id, date, action },
      { new: true, upsert: true }
    );
  }

  function getSecret({ team_id }) {
    return Secret.findOne({ team_id });
  }

  function getState({ team_id, event_id }) {
    return State.findOne({ team_id, event_id });
  }

  function getLogsForEvent({ team_id, event_id }) {
    return Notification.find({ team_id, event_id });
  }

  function getLogsForTeam({ team_id }) {
    return Notification.find({ team_id });
  }

  function getEventsFor({ team_id }) {
    return State.find({ team_id });
  }

  function getAllEvents() {
    return State.find({});
  }

  return {
    saveSecret,
    saveState,
    saveLog,
    getSecret,
    getState,
    getLogsForTeam,
    getLogsForEvent,
    getEventsFor,
    getAllEvents
  };
};
