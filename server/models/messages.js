const mongoose = require("mongoose");
const { type } = require("os");

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    chatId: {
        type:String
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})

const Message=mongoose.model("Message",messageSchema);

module.exports=Message;
