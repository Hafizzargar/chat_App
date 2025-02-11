const userModel = require("../Model/userModel");
const bcrypt=require("bcryptjs");
const gentoken = require("../utils/jsonwebtoken");
const registercontroller=async(req,res)=>{
    const {email,username,password}=req.body;
    console.log(email,username,password);
    if(!email || !username || !password){
         return res.json({message:"missing details"})
    }
    try{
        const existuser=await userModel.findOne({
            email:email
        })
        
        if(existuser){
            return res.json({message:"Register with this email is done !Please enter other username"})
        }
        const existusername=await userModel.findOne({
            username:username
        })
        if(existusername){
            return res.json({message:"Register with this username has register !Please enter other username"})

        }
        const hashpwd=await bcrypt.hash(password,Number(process.env.Number))
      
        
        const newuser=await userModel({
            email:email,
            username:username,
            password:hashpwd,
            
        })
        const token=await gentoken(email);
        await newuser.save();
        return res.json({message:"register checking",status:201,token:token});

    }
    catch(err){
        console.log("err in the login contr  ===>",err);
        return res.json({message:"server_side error🥺",status:500})
        
    }
}
const logincontoller=async(req,res)=>{
    const {email,password}=req.body;
    console.log(email,password);
    try{
        const userexist=await userModel.findOne({email:email});
        if(!userexist){
            return res.json({message:"invalid email or email is not register .🥺PLease register first"})
        }
        const confirmpwd=await bcrypt.compare(password,userexist.password);
        console.log(confirmpwd);
        if(!confirmpwd){
            return res.json({message:"Inavlid Password"});
        }
        req.session.isAuth=true,
        req.session.user={
            s_id:userexist._id,
            email:email,
            username:userexist.username
        }
        const token=await gentoken(email);
        return res.json({message:"Login done",status:201,user:userexist,token:token})

    }
    catch(err){
        console.log('error in logincontroller',err);
        return res.json({message:"server_side erro",status:500})
        
    }
}
module.exports={registercontroller,logincontoller};