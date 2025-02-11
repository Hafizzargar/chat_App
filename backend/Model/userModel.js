const mongoose=require("mongoose");
const userSchema = require("../schema/authSchema");
const userModel=mongoose.model('user',userSchema);
module.exports=userModel;