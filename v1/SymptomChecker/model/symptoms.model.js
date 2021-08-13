
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SymptomsSchema = new Schema({
    "Symptom": { type: String, required: true }, //will use for userId
    "AssociatedDiagnoses": String,
    "MedicalProfileRestrictions": String
});
    

module.exports = mongoose.model('symptoms', SymptomsSchema );