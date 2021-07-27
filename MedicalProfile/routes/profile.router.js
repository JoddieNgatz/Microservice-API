const { ProfilingLevel } = require('mongodb');

module.exports = app => {
    //connect controller for books operations

    console.log('in routes');


var model = require('../model/');
const profile = model.medProf;
        

//create profile
    
/**
 * @method - POST
 * @param - /username
 * @description - Post profile data
 */
    app.post("/profile/", (req, res) => {
        
        const body_Un = req.body.username;
        if (!body_Un) {
            res.status(418).json({ message: 'Need username' });
        }
          //create and save profile 
    const prof = new profile({
        username: req.body.username,
        age: req.body.age,
        sex: req.body.sex,
        alcoholConsumption: req.body.alcoholConsumption,
        alergies: req.body.alergies,
        medicalBackground: req.body.medicalBackground,
        pregnant: req.body.pregnant,
    });
        
            //save prof
    prof.save(prof).then((data) => {
        res.status(200).json((data));
        
    }).catch((err) => {
        res.status(500).json({message: err+ 'Error Creating try again'});
    });
       
    });


//get/finds users medical profile
    
    /**
 * @method - GET
 * @param - /username
 * @description - gets users profile data
 */
    app.get("/profile/:username", (req, res) => {
        //http://localhost:8080/profile/:"joe"

        let username = req.params.username;
        console.log(username);
        profile.findById(username, req.body, { useFindAndModify: false }).then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update profile with username: " + username
                });
            }
            else {
                res.status(200).json({ message: 'Profile was updated sucessfully' });
                res.status(200).json({ data: data });
            }
        }).catch(err => {
            res.status(500).json({
                message: err + "Error updating profile with username:" + username
            });
        });
    });
        //  profile.find({ username }, function (err, profile) {
            
        //      if (err) {
        //         res.status(500).json({ message: err });
        //     }
        //     if (!profile) {
        //         res.status(404).json({ message: "Profile data Not Found.Add data" })
        //     }
        //     res.status(200).json(profile);
        //     res.status(200).json({
        //         username: profile.username,
        //         age: profile.age,
        //         sex: pofile.sex,
        //         alcoholConsumption: profile.alcoholConsumption,
        //         alergies: profile.alergies,
        //         medicalBackground: profile.medicalBackground,
        //         pregnant: profile.pregnant,
        //     });
        //  });
       
   
    
    
       
    /**
 * @method - PUT
 * @param - /username
 * @description - UPDATES users profile data
 */
     app.put("/profile/:username", (req, res) => {
        
           
        profile.find({
             username: req.body.username
         }).exec((err, user) => {
             if (err) {
                 res.status(500), json({ message: err });
                 return;
             }
             if (!user) {
                 res.status(404).json({ message: "User Not Found. Register" })
             }
 
             res.status(200).json({
                 username: profile.username,
                 age: profile.age,
                 sex: pofile.sex,
                 alcoholConsumption: profile.alcoholConsumption,
                 alergies: profile.alergies,
                 medicalBackground: profile.medicalBackground,
                 pregnant: profile.pregnant,
             });
         });
     });
}



    
// /**
//  * @method - POST
//  * @param - /register
//  * @description - User can register passing json username,email,password
//  */
    // app.post("/profile/", (req, res) => {
    //     const body = req.body.email;
    //     if (!body) {
    //         res.status(404).json({ message: "Kindly fill in details username, email and password" });
    //     }
    //     else {
    //     const nUser = new usr({
    //         "username": req.body.username, //will use for userId
    //         "email": req.body.email,
    //         "password": req.body.password,
    //     });
    //     nUser.save((err) => {
    //         if (err) {
    //             res.status(500).json({ err: err });
    //             return;
    //         } else {
    //             res.status(200).json({ message: "User registered Successfully!" });
    //         }
    //     });
    // }
    // });


     
    //    usr.findOne({
    //         username: req.body.username
    //     }).exec((err, user) => {
    //         if (err) {
    //             res.status(500), json({ message: err });
    //             return;
    //         }
    //         if (!user) {
    //             res.status(404).json({ message: "User Not Found. Register" })
    //         }
    //         else {
                
    //         }

    //         res.status(200).json({
    //             name: profile.username,
    //             email: profile.email,
    //             username: profile.username,
    //             age: profile.age,
    //             sex: pofile.sex,
    //             alcoholConsumption: profile.AlcoholConsumption,
    //             alergies: profile.Alergies,
    //             medicalBackground: profile.MedicalBackground,
    //             Pregnant: profile.pregnant,
    //         });
        // })