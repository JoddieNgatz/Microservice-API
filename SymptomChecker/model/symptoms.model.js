
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Medschema = new Schema({
    "Symptom": { type: String, required: true }, //will use for userId
    "Associated diagnoses": String,
    "Medical Profile Restrictions": String
});

module.exports =  mongoose.model('MedicalProfile', Medschema)