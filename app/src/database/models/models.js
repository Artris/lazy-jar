const mongoose = require('mongoose');
const schema = require('./schema/schema.js')
mongoose.connect('mongodb://mongo:27017/lazyJar');

module.exports = require('./models.factory.js')(schema, mongoose);