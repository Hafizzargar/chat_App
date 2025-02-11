const chatmodel = require("../Model/chatModel");
const mongoose=require('mongoose');

const recivechatcontroller=async(req,res)=>{
    console.log(req.body);
    const userlogin_id=req.session.user.s_id;
    const personidreciver=req.body.personidreciver;
    if(!req.session.isAuth){
        return res.json({message:"Expire session"});
    }
    try{
        const chatdata = await chatmodel.find({ personidreciver });

        console.log(chatdata);
        return res.json({message:"data get success",status:201,chatdata:chatdata,sendermessage_id:req.session.user.s_id,recivermessage_id:personidreciver})
    }
    catch(err){

    }

}
const sendchatcontroller=async(req,res)=>{
    console.log(req.body);
    const {chatsend}=req.body;
    const {_idreciver}=req.body;
    console.log(chatsend);
    console.log(_idreciver);
    console.log(req.session.user);
    
    console.log(26);
    
    if(!req.session.isAuth){
        return res.json({message:"Expire session"});
    }
    try{
        const newchat=new chatmodel({
            chatsend:chatsend,
            personidsender:req.session.user.s_id,
            personidreciver:new mongoose.Types.ObjectId(_idreciver)
        })
        await newchat.save();
        console.log('done save chat');
        
        return res.json({message:'chat has been sent',status:201});

    }
    catch(err){
        console.log(err);
        return res.json({message:'error in sening message due to server error',status:500});
        

    }

}

module.exports={recivechatcontroller,sendchatcontroller};