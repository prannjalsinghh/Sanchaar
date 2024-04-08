const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
require("dotenv").config();

const aadharSchema = new mongoose.Schema({   
    aadhar_number:{
        type:String,
        unique:true
    },
    name:String,
    address:String,
    fathers_name:String,
    indian:false
})

const Aadhar = mongoose.model('aadhar',aadharSchema);
module.exports = Aadhar;