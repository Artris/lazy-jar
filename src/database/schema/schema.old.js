const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lazyJar');

const BotSecretSchema = new mongoose.Schema({
    bot_user_id: {type: String, required: true},
    bot_access_token: {type: String, required: true}
})

const SecretSchema = new mongoose.Schema({
    team_id: {type: String, required: true},
    access_token: {type: String, required: true},
    bot: {type: BotSecretSchema, required: true}
});

const StateMemberSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    ignore: {type: Boolean},
    skip_until: {type: String}
})

const FrequencyTimeSchema = new mongoose.Schema({
    hh: {type: Number, required: true},
    mm: {type: Number, required: true},
    zone: {type: String, required: true}
    
})

const StateSchema = new mongoose.Schema({
    team_id: {type: String, required: true},
    event_id: {type: String, required: true},
    time_to_respond: {type: 'string', default:"1800"},
    members: [StateMemberSchema],
    frequency:{type:String, default:"daily"},
    time: {type: FrequencyTimeSchema, required: true},
    halted: {type: Boolean, required: true, default: false}
})

const NotificationSchema = new mongoose.Schema({
    team_id: {type: String, required: true},
    event_id: {type: String, required: true},
    user_id: {type: String, required: true},
    date: {type: String, required: true},
    action: {type: String, required: true}
})





