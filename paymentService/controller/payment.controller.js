
var model = require('../models/');
    const pymnt = model.pymnt;
const unirest = require('unirest');
const keys = require('../config/keys.config');
const mpassKey = keys.mPasskey
exports.mpesa = (req, res) => {
    let userphone = req.params.userphone;
        
    console.log(userphone);

let req = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
.headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer wzwzbe4iahxMxH3dcpY1FSbOA8iG'
})
.send(JSON.stringify({
    "BusinessShortCode": 174379,
    "Password": mpassKey,
    "Timestamp": "20210817120339",
    "TransactionType": "CustomerPayBillOnline",
    "Amount": 1,
    "PartyA": userphone,
    "PartyB": 174379,
    "PhoneNumber": userphone,
    "CallBackURL": "https://mydomain.com/path",
    "AccountReference": "Consult doc",
    "TransactionDesc": "Payment of consultancy" 
  }))
.end(res => {
    if (res.error) throw new Error(res.error);
    console.log(res.raw_body);
    

    console.log(res.body);
});
    
    request(`http://localhost:8082/profile/${username}`, (error, response, body) => {
        if (error) {
            res.status(500).json('An error occured Getting medical Info')
        }
        else {
            
            usersMedInfo = JSON.parse(body);
            body.id = "***";
            res.status(201).json({ body });
            console.log(usersMedInfo.alergies);
        
        }
    });
    

};