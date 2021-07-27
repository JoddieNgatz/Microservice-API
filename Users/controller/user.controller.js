
var model = require('../models/user.model');
const usr = model.usr;

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
    bcrypt.hash(req.body.password, 1).then(
        (hash) => {
            const nUser = new usr({
                "username": req.body.username, //will use for userId
                "email": req.body.email,
                "password": hash
            });
            //instance
            console.log(`in register controller`);
    
            nUser.save().then(() => {
                res.status(201).json({ "message": "User has been registered succesfully" }).catch((err) => {
                    if (err) {
                        res.send(500).json({ error: err + 'Error Creating try again' });
                    }
                })
            })
        });
}

