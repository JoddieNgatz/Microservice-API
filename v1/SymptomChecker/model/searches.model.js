
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See all searches and results that I have fetched, along with search date
// store previous searches-use username in Array,
var PreviousSearchs = new Schema({
    "username": String,
    "Searched": String,
    "Results": Object,
}, { timestamps: true });

module.exports = mongoose.model('SearchResults', PreviousSearchs);