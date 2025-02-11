const express=require("express");
const { registercontroller, logincontoller } = require("../controller/authcontroller");

const authrouthers=express.Router();

authrouthers.post('/register',registercontroller)

authrouthers.post('/login',logincontoller)


module.exports=authrouthers;