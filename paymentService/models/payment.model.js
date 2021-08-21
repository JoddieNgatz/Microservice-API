//username
//email,
//passsword,
//uid

//would like a difrent microservice 
//for storing medical data accessed by userId

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentschema = new Schema({
    userphone: { type: Number, unique: true, required: true }, //will use for userId
    // email: {
    //     type: String,
    //     unique: true,
    //     lowercase: true
    // },
    amount:{type:Number,required:true},
    refrence: { type: String, required: true },
});

module.exports =  mongoose.model('payments', paymentschema)