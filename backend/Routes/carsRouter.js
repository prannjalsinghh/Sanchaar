const express = require('express');
const router = new express.Router();
const auth = require('../auth');
const {createNewCar, lookForMissingCar, updateMissingCar} = require('../Controller/Cars');

router.post('/createNewMisingCar', auth, createNewCar);
router.get('/lookForMissingCar/:id', auth, lookForMissingCar);
router.post('/updateMissingCar', auth, updateMissingCar);

module.exports = router;