const express = require("express");
const router = express.Router();
const auth = require("../auth");
const {getDetailsByDNA, addDNA} = require('../Controller/DNA');

router.get('/getDetailsByDNA/:dna', auth, getDetailsByDNA);
router.post('/addDNA', auth, addDNA);

module.exports = router;
