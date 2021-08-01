const axios = require('axios');

//const request = require('request');

module.exports = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
  });
          
// request(`baseURL`, (error, response, body) => {
//     if (error) {
//         res.status(500).json('An error occured Getting medical Info')
//     }
//     else {
        
//         usersMedInfo = JSON.parse(body);
//         body.id = "***";
//         res.status(201).json({ body });
//         console.log(usersMedInfo.alergies);
    
//     }
// });

}