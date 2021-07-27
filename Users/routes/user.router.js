module.exports = app => {
    //connect controller for books operations
    const userController = require('../controller/user.controller')
    console.log('in routes')

    app.post("/user/register", async (req, res) => {
        await userController.register;
        //res.send({message: req.body});
    });

    app.post("user/signin", async (req, res) => {
        await userController.signIn;
        //res.send({message: req.body});
    })
}