const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
require("dotenv").config();

const postsSchema = new mongoose.Schema({
    postCreationDate:{
        type: Date,
        default: Date.now()
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    postedByName:{
        type:String,
        required:true,
    },
    postedState:{
        type:String,
        required:true
    },
    region : {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required:true
    },
    url:{
        type:String,
    },
    filters:{
        type:String,
        required:true
    },
    text:{
        type:String,
    },
    tags:[{
        type:String,
    }]

})
const Post = mongoose.model('Posts',postsSchema);
module.exports = Post;