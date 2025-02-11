const mongoose=require("mongoose");
const { use } = require("../routhers/authrouther");
const Schema=mongoose.Schema;
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
    
},
{
    timestamps:true

}
)
module.exports=userSchema;