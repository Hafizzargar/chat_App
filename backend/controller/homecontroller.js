const userModel = require("../Model/userModel");

const getinfocontroller=async(req,res)=>{
    if(!req.session.isAuth){
        return res.json({message:'invalid user'});
    }
    try{
        const datagetuser=await userModel.find({});    
        return res.json({message:"getting user data",status:201,datagetuser:datagetuser,email:req.session.user.email,name:req.session.user.username})

    }
    catch(err){
        return res.json({message:'server-side error',status:500})
    }

}
module.exports={getinfocontroller}