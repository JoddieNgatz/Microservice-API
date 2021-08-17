module.exports = app => {
 

    console.log('in routes');

    var controller = require('../controller/payment.controller');
    // const usr = model.usr;
    // const bcrypt = require("bcrypt");
    

    
/**
 * @method - get
 * @param - /payment
 * @description - User can make payment with mpesa api
 */
    app.get("/payment/mpesa/:userphone", controller.mpesa);


// /**
//  * @method - POST
//  * @param - /signin
//  * @description - User SignIn passing json email,password
//  */
//     app.post("/payment  ", controller.  );

    

}