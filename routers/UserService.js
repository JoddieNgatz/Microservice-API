//file to reroute request to Feed Service
const express = require('express');
const router = express.Router()
const userrouter = require('../Users/routes/user.router')
const apiAdapter = require('./apiAdapter');
const BASE_URL = 'http://localhost:8080';
const api = apiAdapter(BASE_URL);

/**
 * @method - POST
 * @param - /register
 * @description - User can register passing json username,email,password
 */
router.post('/user/register', (req, res) => {

    // res.json(req.path + " called")
    api.post(req.path, req.body).then(resp => {
        res.json(resp.data);
    }),(error) => console.log(error) ;
});

/**
 * @method - POST
 * @param - /signin
 * @description - User SignIn passing json email,password
 */
router.post('/user/signin', (req, res) => {
    api.post(req.path,res.body).then(resp => {
        res.json(resp.data)
      })
});


module.exports = router