var model = require('../model');
const request = require('request');

const symptomsModel = model.symptoms;
const searchHistory = model.PreviousSearchs;



var usersMedInfo = {};    
   
        //create and save symptoms
 exports.postSymptoms = (req, res) => {
        //create and save  
        const sympt = new symptomsModel({
            Symptom: req.body.Symptom,
            AssociatedDiagnoses: req.body.AssociatedDiagnoses,
            MedicalProfileRestrictions: req.body.MedicalProfileRestrictions
        });

        //save symptom
        sympt.save(sympt).then((data) => {
            res.status(200).json((data));

        }).catch((err) => {
            res.status(500).json({ message: err + 'Error Creating try again' });
        });


};
        //gets users profile data from other microservice
exports.getUsersMedInfo = (req, res) => {
    let username = req.params.username;
        
    console.log(username);
        
    request(`http://localhost:8082/profile/${username}`, (error, response, body) => {
        if (error) {
            res.status(500).json('An error occured Getting medical Info')
        }
        else {
            res.json(body);
            usersMedInfo = JSON.parse(body);
            console.log(usersMedInfo.alergies);
        
        }
    });
};

exports.searchSymptoms = async (req, res) => {
    console.log('Get data');
        
    let symptom = req.params.symptom;
    console.log(symptom);
    console.log(usersMedInfo);
    let alergies = usersMedInfo.alergies;
    let age = usersMedInfo.age;
    let sex = usersMedInfo.sex;
    let pregnant = usersMedInfo.pregnant;
    if (pregnant == true) {
        pregnant = "pregnant";
    }
             
    const foundSymptom = await symptomsModel.find({ $and: [{ Symptom: `${symptom}` }, { $or: [{ MedicalProfileRestrictions: `${sex}` }, { MedicalProfileRestrictions: "Unisex" }, { MedicalProfileRestrictions: "all" }, { MedicalProfileRestrictions: `>${age}` }, { MedicalProfileRestrictions: `<${age}` }, { MedicalProfileRestrictions: `${pregnant}` },] }] });
                
    let username = usersMedInfo.username;
    const searchResults = { username, symptom, foundSymptom };
    console.log(searchResults);

    //const v = controller.saveSearchHistory(searchResults, res); //saves result that dont return symptoms as well incase we need to add new ones
    const v = this.saveSearchHistory(searchResults, res); //saves result that dont return symptoms as well incase we need to add new ones
                
    if (!foundSymptom) {
        res
            .status(500)
            .json({ message: err + "  Error getting symptoms " + foundSymptom });
    } else {
        console.log(foundSymptom);
        res.status(200).json({ message: `Saved Search Result ${v}`, foundSymptom });
                   
            
    }
            
};


                    
 exports.saveSearchHistory= function(searchResults){
                console.log("saving search result");
                console.log(searchResults);
                //save search History | will save including results that are not succesful search incase one more symptoms are to be added
                const newSearch = new searchHistory({
                    username: searchResults.username,
                    Searched: searchResults.symptom,
                    Results: searchResults.foundSymptom
                });
                console.log("recieved post request" + newSearch);
                //save search history
                newSearch.save(newSearch).then((data) => {
                    return ((data));
                    
                }).catch((err) => {
                    return ({ message: err + 'Error saving search history' });
                });
                        
};
            


        //retrieves all symptom search history of a user
        exports.getUserSearchHistory= (req, res) => {

            let username =  req.params.username ;
        
            console.log(username);
    
    
            searchHistory.find({ username }).then((data) => {
                if (!data)
                    res.status(404).json({ message: "Cannot get search history for: " + username });
                else {
                    res.status(200).json({ data });
                }
            }).catch(err => {
                res
                    .status(500)
                    .send({ message: err + "  Error finding history. Check username for: " + username});
            });

        };
