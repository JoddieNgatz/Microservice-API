
module.exports = app => {

    console.log('in routes');
    const request = require('request');
    
    var model = require("../model");
    const symptomsModel = model.symptoms;
    const searchHistory = model.PreviousSearchs;
    
    var controller = require('../controllers/symptoms.controller');
    var usersMedInfo = {};


    /**
     * @method - POST
     * @param - 
     * @description - Post symptoms data
     */
    app.post("/symptoms", (req, res) => {
      
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
       
    });
    
    
    /**
 * @method - GET
 * @param - /username
 * @description - gets users profile data from other microservice
 */
    app.get('/search/:username', (req, res) => {

        let username = req.params.username;
        
        console.log(username);

        request(`http://localhost:8080/profile/${username}`, (error, response, body) => {
            if (error) {
                res.status(500).json('An error occured Getting medical Info')
            }
            else {
                res.json(body);
                usersMedInfo = JSON.parse(body);
                console.log(usersMedInfo.alergies);

            }
        });
    });
     


    /**
* @method - GET
* @param - /symptom
* @description - / Searches for symptoms and save results that have been fetched, along with search date to store previous searches,
*/
    app.get("/symptoms/:symptom", async (req, res) => {
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
     
        const foundSymptom = await symptomsModel.find({ $and: [{ Symptom: `${symptom}` }, { $or: [{ MedicalProfileRestrictions: `${sex}` }, { MedicalProfileRestrictions: "Unisex" }, { MedicalProfileRestrictions: "all" },  { MedicalProfileRestrictions: `>${age}` },{ MedicalProfileRestrictions: `<${age}` }, { MedicalProfileRestrictions: `${pregnant}` },] }] });
        
        let username = usersMedInfo.username;
        const searchResults = { username, symptom, foundSymptom };
        console.log(searchResults);
        const v = controller.saveSearchHistory(searchResults, res); //saves result that dont return symptoms as well incase we need to add new ones
        
        
        if (!foundSymptom) {
            res
                .status(500)
                .json({ message: err + "  Error getting symptoms " + foundSymptom });
        } else {
            console.log(foundSymptom);
            res.status(200).json({message: `Saved Search Result ${v}`, foundSymptom });
           
    
        }
    

    });


    //create searches
    
    /**
     * @method - Get all search History for a user
     * @param - /username
     * @description - retrieves all symptom search history of a user
     */
    app.get("/searches/:username", (req, res) => {
       let username = { symptom: req.params.username };
        
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
   
    });
       


   

}