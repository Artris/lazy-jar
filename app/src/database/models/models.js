const mongoose = require('mongoose');
const schema = require('./schema/schema.js');

const {
    MONGO_CONTAINER,
    MONGO_PORT,
    DB_NAME
} = process.env;

mongoose.connect(`mongodb://${MONGO_CONTAINER}:${MONGO_PORT}/${DB_NAME}`);

module.exports = require('./models.factory.js')(schema, mongoose);