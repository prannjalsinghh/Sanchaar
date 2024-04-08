const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
require("dotenv").config();


const userSchema=new mongoose.Schema({
    accountCreationDate:{
        type:Date,
        default:Date.now()
    },
    name:String,
    number:{
        type:String,
        unique:true
    },
    state :{
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:'https://i.stack.imgur.com/l60Hf.png'
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    }],
    notifications:[{
        sender:String,
        request:String,
        time:{
            type:Date,
            default:Date.now()
        }
    }],
    dateOfBirth:{
        type:Date,
        default:Date.now()
    },
    gender:String,
})

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

const User = mongoose.model('Users',userSchema)

module.exports = User;