module.exports = mongoose => {
  const StateMemberSchema = mongoose.Schema({
    user_id: {
      type: String,
      required: true
    },
    user_im_id: {
      type: String,
      required: true
    },
    ignore: {
      type: Boolean
    },
    skip_until: {
      type: String
    }
  });

  const FrequencyTimeSchema = mongoose.Schema({
    hh: {
      type: Number,
      required: true
    },
    mm: {
      type: Number,
      required: true
    },
    zone: {
      type: String,
      required: true
    }
  });

  const BotSecretSchema = mongoose.Schema({
    bot_user_id: {
      type: String,
      required: true
    },
    bot_access_token: {
      type: String,
      required: true
    }
  });

  const logSchemaStructure = {
    team_id: {
      type: String,
      required: true
    },
    event_id: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    }
  };

  const LogSchema = mongoose.Schema(logSchemaStructure);

  const SecretSchema = mongoose.Schema({
    team_id: {
      type: String,
      required: true
    },
    access_token: {
      type: String,
      required: true
    },
    bot: {
      type: BotSecretSchema,
      required: true
    }
  });

  const StateSchema = mongoose.Schema({
    team_id: {
      type: String,
      required: true
    },
    event_id: {
      type: String,
      required: true
    },
    time_to_respond: {
      type: 'string',
      default: '1800'
    },
    members: [StateMemberSchema],
    frequency: {
      type: String,
      default: 'daily'
    },
    time: {
      type: FrequencyTimeSchema,
      required: true
    },
    halted: {
      type: Boolean,
      required: true,
      default: false
    },
    url: {
      type: String
    }
  });

  const NotificationSchema = mongoose.Schema(logSchemaStructure);

  return {
    LogSchema,
    NotificationSchema,
    StateSchema,
    SecretSchema
  };
};
