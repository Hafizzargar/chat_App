const mongoose=require("mongoose");
const connectioncreated=mongoose.connect(process.env.mongo_uri).then(()=>console.log("connection created successfully done")
).catch((err)=>console.log("connection not created")
)
module.exports=connectioncreated;