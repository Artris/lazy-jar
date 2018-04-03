module.exports = ({
    SecretSchema,
    StateSchema,
    LogSchema,
    NotificationSchema
}, mongoose) => ({
    Secret: mongoose.model('Secret', SecretSchema),
    State: mongoose.model('State', StateSchema),
    Notification: mongoose.model('Notification', NotificationSchema),
    Log: mongoose.model('Log', LogSchema)
})