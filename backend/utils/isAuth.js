const isAuth=(req,res,next)=>{
    if(req.session.isAuth){
        next();
    }
    else{
        return res.json({message:'expire session'});
    }
}
module.exports=isAuth;