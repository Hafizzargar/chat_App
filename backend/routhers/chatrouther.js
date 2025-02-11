const express=require('express');
const { recivechatcontroller, sendchatcontroller } = require('../controller/chatcontroller');
const chatrouther=express.Router();

chatrouther.post('/chatrecive',recivechatcontroller);
chatrouther.post('/chatsend',sendchatcontroller);

module.exports={chatrouther};