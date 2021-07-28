const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.symptomsModel = require('./symptoms.model');
db.PreviousSearchs = require('./searches.model');

module.exports = db;