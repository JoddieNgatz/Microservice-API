//username
//email,
//passsword,
//uid

//would like a difrent microservice 
//for storing medical data accessed by userId

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const userschema = new Schema({
    username: { type: String, unique: true, required: true }, //will use for userId
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: { type: String, required: true },
});

userschema.plugin(uniqueValidator);

module.exports =  mongoose.model('users', userschema)