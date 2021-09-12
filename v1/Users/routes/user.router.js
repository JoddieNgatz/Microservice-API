module.exports = app => {
 

    console.log('in routes');

    var controller = require('../controller/users.controller');
    // const usr = model.usr;
    // const bcrypt = require("bcrypt");
    
        
    
/**
 * @method - POST
 * @param - /register
 * @description - User can register passing json username,email,password
 */
    app.post("/v1/user/register", controller.signUp);


/**
 * @method - POST
 * @param - /signin
 * @description - User SignIn passing json email,password
 */
    app.post("/v1/user/signin", controller.signIn);

    

}