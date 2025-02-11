const express=require("express");
const { getinfocontroller } = require("../controller/homecontroller");
const homerouther=express.Router();

//get user info
homerouther.get('/userinfo',getinfocontroller);

module.exports=homerouther;


