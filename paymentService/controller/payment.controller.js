
var model = require('../models/');
const pymnt = model.pymnt;
const unirest = require('unirest');
const keys = require('../config/keys.config');
const mpassKey = keys.mPasskey
const callback = keys.callbackUrl;

exports.mpesa = (req, res) => {
    let userphone = req.body.userphone;
        
    console.log(userphone);

unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
.headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer wzwzbe4iahxMxH3dcpY1FSbOA8iG'
})
.send(JSON.stringify({
    "BusinessShortCode": 174379,
    "Password": mpassKey,
    
    "TransactionType": "CustomerPayBillOnline",
    "Amount": 1,
    "PartyA": userphone,
    "PartyB": 174379,
    "PhoneNumber": userphone,
    "CallBackURL": callback,
    "AccountReference": "Consult doc",
    "TransactionDesc": "Payment of consultancy" 
  }))
.end(res => {
    if (res.error) throw new Error(res.json(error));
    console.log(res.raw_body);
    

    console.log(res.body);
});
    
    
    // request(`http:// `, (error, response, body) => {
    //     if (error) {
    //         res.status(500).json('An error occured Getting medical Info')
    //     }
    //     else {
    //         res.status(201).json({ body });
        
    //     }
    // });
    

};