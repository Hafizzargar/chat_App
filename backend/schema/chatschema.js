const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chatsend: {
        type: String,
        required: true
    },
    createdate: {
        type: String,
        default: () => new Date().toISOString()
    },
    personidsender:{
        type: Schema.Types.ObjectId,  // Storing the user's ID
        ref: 'User',  // Referencing the User model
        required: true
    },
    personidreciver:{
        type:Schema.Types.ObjectId,
        ref: 'User',  // Referencing the User model
        required: true
        
    }
}
,{
    timestamps:true
});

module.exports = chatSchema;
