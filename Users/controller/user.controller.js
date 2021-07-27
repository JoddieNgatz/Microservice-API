
var model = require('../models/user.model');
const usr = model.usr;
const bcrypt = require("bcryptjs");


// SignIn
exports.signIn = async (req, res, next) =>
{
    usr.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            res.status(401).json({
                error: "user not found"
            });
        }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                  if (!valid) {
                    res.status(401).json({
                      error: new Error('Wrong password!')
                    });
                  }
                  res.status(200).json({
                    username: user.username,
                  });
                }
              ).catch(
                (error) => {
                  res.status(500).json({
                    error: error
                  });
                }
              );
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error: error
              });
            }
          );
        
}
    
// Register
exports.register = (req, res, next) => {

    const body = req.body.username;
    if (!body) {
        res.status(418).send({ error: 'Send Content' });
    }

            const nUser = new usr({
                "username": req.body.username, //will use for userId
                "email": req.body.email,
                "password": bcrypt.hashSync(req.body.password, 3)
            });
            //instance
            console.log(`in register controller`);
    
    nUser.save((err) => {
        if (err) {
            res.status(500).json().send({ message: err });
            return;
        } else {
            res.status(200).json().send({ message: "User registered Successfully!" });
        }
    });
      
}

