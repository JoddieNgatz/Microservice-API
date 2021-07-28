

module.exports = app => {
    
    var model = require('../model/');
    const profile = model.medProf;
    const controller = require('../controller/MedProf.controller');
        

    //create profile
    
    /**
     * @method - POST
     * @param - /username
     * @description - Post medical information for profile data
     */
    app.post("/profile/", controller.createProfile);


    //    get/finds users medical profile
    
    /**
 * @method - GET
 * @param - /username
 * @description - gets/finds users medical profile data
 */
    app.get("/profile/:username", controller.findMedProfile);
   

       
    /**
 * @method - PUT
 * @param - /username
 * @description - UPDATES users profile data
 */
    app.put("/profile/:username", controller.updateMedProfile);
           
}