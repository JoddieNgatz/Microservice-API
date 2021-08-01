
const express = require('express');
const router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:8082'
const api = apiAdapter(BASE_URL)

    /**
     * @method - POST
     * @param - /username
     * @description - Post medical information for profile data
     */
router.post('/profile/', (req, res) => {
    api.post(req.path, res.body).then(resp => {
        console.log(BASE_URL + req.path);
        res.json(resp.data);
    });

});


/**
 * @method - GET
 * @param - /username
 * @description - gets/finds users medical profile data
 */
router.get('/profile/:username', (req, res) => {
    api.get(req.path).then(resp => {
        console.log(BASE_URL + req.path);
        res.json(resp.data)
    });
});

/**
 * @method - PUT
 * @param - /username
 * @description - UPDATES users profile data
 */
 router.put('/profile/:username', (req, res) => {
    api.put(req.path, res.body).then(resp => {
        console.log(BASE_URL + req.path);
        res.json(resp.data);
    });
});


module.exports = router