
module.exports = app => {

    console.log('in routes');
    var model = require("../model");
    var controller = require('../controllers/symptoms.controller');
 


    /**
     * @method - POST
     * @param - 
     * @description - Post symptoms data
     */
    app.post("/v1/symptoms", controller.postSymptoms);
    
    
    /**
 * @method - GET
 * @param - /username
 * @description - gets users profile data from other microservice
 */
    app.get('/v1/search/:username', controller.getUsersMedInfo);
     


    /**
* @method - GET
* @param - /symptom
* @description - / Searches for symptoms and save results that have been fetched, along with search date to store previous searches,
*/
    app.get("/v1/symptoms/:symptom", controller.searchSymptoms);


    //create searches
    
    /**
     * @method - Get all search History for a user
     * @param - /username
     * @description - retrieves all symptom search history of a user
     */
    app.get("/v1/searches/:username", controller.getUserSearchHistory);
       


   

}