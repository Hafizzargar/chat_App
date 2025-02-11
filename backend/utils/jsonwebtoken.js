const jwt=require("jsonwebtoken");
const gentoken=(email)=>{
    return jwt.sign(email,process.env.token_Key)
}
module.exports=gentoken;