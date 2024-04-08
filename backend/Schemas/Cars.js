const mongoose  = require('mongoose');

const CarSchema = new mongoose.Schema({
    carNumber:{
        type:String,
        required:true,
        unique:true
    },
    carOwnerName:{
        type:String,
        required:true
    },
    carOwnerNumber:{
        type:String,
        required:true
    },
    isMissing:{
        type:Boolean,
        required:true,
    },
    isClaimed:{
        type:Boolean,
        required:true,
        default:false,
    }
})

const Car = mongoose.model('car',CarSchema);
module.exports = Car;