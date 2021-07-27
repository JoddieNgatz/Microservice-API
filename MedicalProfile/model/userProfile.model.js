
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Medschema = new Schema({
    username: { type: String, unique: true, required: true }, //will use for userId
    age: { type: String },
    sex: { type: String },
    AlcoholConsumption: { type: Number },
    Alergies: { type: Array },
    MedicalBackground: { type: Array },
    Pregnant: { type: Boolean},
});

module.exports =  mongoose.model('MedicalProfile', Medschema)