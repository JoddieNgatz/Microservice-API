        var model = require('../model/');
        //const symptoms = model.symptoms;
        const searchHistory = model.PreviousSearchs;

   
        
        exports.getUsersMedInfo = (req, res) => {

        }
        
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

exports.searchSymptoms = (req, res) => {
    // //filter search results using medicl info. then return result and then trigger save searches controller
    // symptoms.find(request.query).then((data) => {
    //     let results = { data };
    //     if (!data)
    //         res.status(404).send({ message: "Cannot get symptom: " + symptom });
    //     else res.send(data);
    // }).catch(err => {
    //     res
    //         .status(500)
    //         .send({ message: err + "  Error finding symptom. Check Spelling:" + symptom });
    // });

};