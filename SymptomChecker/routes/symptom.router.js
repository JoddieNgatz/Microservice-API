// const { ProfilingLevel } = require('mongodb');

module.exports = app => {

    console.log('in routes');
    const request = require('request');
    
    var model = require('../model/');
    const symptomsMod = model.symptomsModel;
    const searchHistory = model.PreviousSearchs;
    let usern = ""
    
   // var controller = require('../controllers/symptoms.controller');
    //var searchCntrl = controller.searchSymptoms;
        //   store users medical profile to parse
    var usersMedInfo = {};
    let searchResults = {};


    /**
     * @method - POST
     * @param - 
     * @description - Post symptoms data
     */
     app.post("/symptoms", (req, res) => {
      
        //create and save  
        const sympt = new symptomsMod({
            Symptom: req.body.Symptom,
            AssociatedDiagnoses: req.body.AssociatedDiagnoses,
            MedicalProfileRestrictions: req.body.MedicalProfileRestrictions
        });
        
        //save prof
        sympt.save(sympt).then((data) => {
            res.status(200).json((data));
        
        }).catch((err) => {
            res.status(500).json({ message: err + 'Error Creating try again' });
        });
       
     });
    
    
    /**
 * @method - GET
 * @param - /username
 * @description - gets users profile data
 */
    app.get('/search/:username', (req, res) => {
        let username = req.params.username;
        
        console.log(username);

        request(`http://localhost:8080/profile/${username}`,  (error, response, body) => {
            if(error) {
                res.json('An error occured Getting medical Info')
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
 * @description - gets symptom search results and saves search history data
 */ 
    app.get("/symptoms/:symptom", (req, res) => {
        console.log('Get data');
        let symptom = req.params.symptom;
        console.log(symptom);
        symptomsMod.findOne({ symptom }).then((data) => {


    //save search History | will save including results that are not succesful search incase one more symptoms are to be added 
        searchResults = JSON.parse(data);
        const newSearch = new searchHistory({
            username: usersMedInfo.username,
            Searched: symptom ,
            Results: searchResults,
        });
        
     //save search history
        newSearch.save(newSearch).then((data) => {
            res.status(200).json((data));
        
        }).catch((err) => {
            res.status(500).json({ message: err + 'Error saving search history' });
        });
                
           
            if (!data)
                res.status(404).json({ message: "Cannot get symptom: " + symptom });
            else {
                console.log(data);
                res.status(200).json(data);
            }
        }).catch(err => {
            res
                .status(500)
                .json({ message: err + "  Error finding symptom. Check Spelling:" + symptom });
        });
    });



    //create searches
    
    /**
     * @method - Get all search History
     * @param - /username
     * @description - retrieves all search history
     */
    app.get("/searches", (req, res) => {
        
       
    });


//         // let symptom = { symptom: req.params.symptom };
//         let symptom = req.params.symptom;
        
//         console.log(symptom);


//         profile.find({ symptom }).then((data) => {
//             let results = { data };
//             if (!data)
//                 res.status(404).send({ message: "Cannot get symptom: " + symptom });
//             else res.send(data);
//         }).catch(err => {
//             res
//                 .status(500)
//                 .send({ message: err + "  Error finding symptom. Check Spelling:" + symptom });
//         });
   
//     });
   

}