
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Medschema = new Schema({
    username: { type: String, unique: true, required: true }, //will use for userId
    age: { type: Number, required: true  },
    sex: { type: String, required: true  },
    alcoholConsumption: { type: Number, },
    alergies: { type: Array, },
    medicalBackground: { type: Array },
    pregnant: { type: Boolean},
});

module.exports =  mongoose.model('MedicalProfile', Medschema)