const mongoose = require('mongoose' );
const schema = require('../schema/schema.js')
mongoose.connect('mongodb://localhost/lazyJar');

module.exports = require('./models.factory.js')(schema, mongoose);