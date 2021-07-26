//username
//email,
//passsword,
//uid

//would like a difrent microservice 
//for storing medical data accessed by userId

const mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    //name: String,
    username: { type: String, unique: true, required: true },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: { type: Number, required: true },
});

var User = mongoose.model('User', UserSchema);
module.exports ={ User };