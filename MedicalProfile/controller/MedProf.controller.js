// create
// update myProfile

var model = require('../model/');
const profile = model.medProf;

//create Med profile
exports.createProfile = (req, res) => {
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
        res.status(500).json({ message: err + 'Error Creating try again' });
    });
   
};

//get/finds users medical profile
exports.findMedProfile = (req, res) => {

    // let username = { username: req.params.username };
    let username = req.params.username;
    
    console.log(username);


    profile.findOne({ username }).then(data => {
        if (!data)
            res.status(404).send({ message: "Cannot get profile with username: " + username });
        else res.send(data);
    }).catch(err => {
        res
            .status(500)
            .send({ message: err + "  Error finding profile with username:" + username });
    });


};


//UPDATES users profile data
exports.updateMedProfile = (req, res) => {
    
    let username = req.params.username;
        
    console.log(username);

    const newProfile = new profile({
        username: req.body.username,
        age: req.body.age,
        sex: req.body.sex,
        alcoholConsumption: req.body.alcoholConsumption,
        alergies: req.body.alergies,
        medicalBackground: req.body.medicalBackground,
        pregnant: req.body.pregnant,
    });
                
    //save prof
    newProfile.updateOne(username, newProfile).then((data) => {
        let respon = {
            message: 'Succesful Update',
            newProfile,
            
        };
        res.status(200).json((respon));
                
    }).catch((err) => {
        res.status(500).json({ message: err + 'Error Updating try again' });
    });
};