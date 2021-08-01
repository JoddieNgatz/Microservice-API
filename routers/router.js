//combine all the services endpoints
const express = require('express');
const router = express.Router();
const UserService = require('./UserService');
const MedProfileService = require('./MedProfileService');
const SymptomService = require('./SymptomSevice');

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(UserService);
router.use(MedProfileService);
router.use(SymptomService);

module.exports = router