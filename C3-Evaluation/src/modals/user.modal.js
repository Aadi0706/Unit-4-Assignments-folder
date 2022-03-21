const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    age:{type:Integer, required:true},
    email:{type:String, required:true},
    profileImages:{type:Array, default:profileImages[0]},
},
{
     versionKey:false,
     timestamps:true,
});

const User=mongoose.model("user",userSchema);
module.exports = User;