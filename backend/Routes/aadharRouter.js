const express = require("express");
const router = express.Router();
const auth = require("../auth");
const {findAadhar} = require('../Controller/Aadhar')

router.get('/findAadhar/:id',auth,findAadhar);


module.exports = router;