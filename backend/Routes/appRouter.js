const express = require("express");
const router = express.Router();
const User = require("../Schemas/UserSchema");
const auth = require("../auth");
const {postUser, getUserByNumber, updateUser, searchUserPartialNumber, pushNotification} = require('../Controller/Authorization');
const {loginByNumber,logout,loginByToken} = require('../Controller/Tasks');


router.post('/postUsers',postUser);
router.get('/getUsers/:number',getUserByNumber)
router.post('/loginByNumber',loginByNumber)
router.post('/loginByToken',auth,loginByToken)
router.post('/logout',auth,logout)
router.post('/updateUser',auth,updateUser)
router.get('/searchUserPartialNumber/:id',auth,searchUserPartialNumber)
router.post('/pushNotification',auth,pushNotification)

module.exports = router;