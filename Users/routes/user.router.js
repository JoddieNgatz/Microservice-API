module.exports = app => {
    //connect controller for books operations
    const userController = require('../controller/user.controller')
    console.log('in routes')
/**
 * @method - POST
 * @param - /register
 * @description - User can register passing json username,email,password
 */
    app.post("/user/register", async (req, res) => {
        await userController.register;
        //res.send({message: req.body});
    });
/**
 * @method - POST
 * @param - /signin
 * @description - User SignIn passing json email,password
 */
    app.post("user/signin", async (req, res) => {
        await userController.signIn;
        //res.send({message: req.body});
    })
}