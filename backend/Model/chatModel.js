const mongoose=require('mongoose');
const chatSchema = require('../schema/chatschema');
const chatmodel=mongoose.model('chat',chatSchema);
module.exports=chatmodel;