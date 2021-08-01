
const express = require('express');
const router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:8081'
const api = apiAdapter(BASE_URL)

/**
* * @method - POST
* @param - 
* @description - Post symptoms data
*/
router.post('/symptoms', (req, res) => {
    api.post(req.path, res.body).then(resp => {
        console.log(BASE_URL + req.path);
        res.json(resp.data);
    });
});

/**
 * @method - GET
 * @param - /username
 * @description - gets users profile data from other microservice
 */
router.get('/search/:username', (req, res) => {
    api.get(req.path).then(resp => {
        console.log(BASE_URL + req.path);
        res.json(resp.data)
      })
});

/**
* @method - GET
* @param - /symptom
* @description - / Searches for symptoms and save results that have been fetched, along with search date to store previous searches,
*/
 router.get('/symptoms/:symptom', (req, res) => {
     api.get(req.path).then(resp => {
        console.log(BASE_URL + req.path);
        res.json(resp.data)
      })
});

/**
* @method - Get all search History for a user
* @param - /username
* @description - retrieves all symptom search history of a user
*/

router.get('/searches/:username', (req, res) => {
    api.get(req.path).then(resp => {
        console.log(BASE_URL + req.path);
        res.json(resp.data)
      })
})

module.exports = router