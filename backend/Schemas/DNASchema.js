const mongoose = require('mongoose');

const DNASchema = new mongoose.Schema({
    DNADetails :{
        type:String,
        required:true,
        unique:true
    },
    person : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'aadhar',
        required: true
    }
})

const DNA = mongoose.model('dna',DNASchema)
module.exports = DNA;
