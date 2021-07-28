    
 //Search for a symptom based on medical profile
    //find all matching symptoms return in as an object
    //filter arcording to medical profile
    //Rest Api makes call to medicalprofile api
    
  
        console.log('in controller');
        const request = require('request');
        var model = require('../model/');
        const symptoms = model.symptoms;
        const searches = model.searches;

        var usersMedInfo = {};
        
        exports.getUsersMedInfo = (req, res) => {
            let username = req.params.username;
            
            console.log(username);
    
            request(`http://localhost:8080/profile/${username}`,  (error, response, body) => {
                if(error) {
                    res.send('An error occured Getting medical Info')
                }
                else {
                res.send(body);
                usersMedInfo = JSON.parse(body);
                }
            });
        }

        exports.searchSymptoms = (req, res) => {
            //filter search results using medicl info. then return result and then trigger save searches controller
            symptoms.find(request.query).then((data) => {
                let results = { data };
                if (!data)
                    res.status(404).send({ message: "Cannot get symptom: " + symptom });
                else res.send(data);
            }).catch(err => {
                res
                    .status(500)
                    .send({ message: err + "  Error finding symptom. Check Spelling:" + symptom });
            });

        }
    
//module.exports = { searchSymptoms, getUsersMedInfo };


// See all searches and results that I have fetched, along with search date
// store previous searches-use username in Array,
// GET Request

