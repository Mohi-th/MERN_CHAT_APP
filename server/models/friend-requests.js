const mongoose=require("mongoose");

const friendRequestSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    }
})

const FriendRequest=mongoose.model("FriendRequest",friendRequestSchema)

module.exports =FriendRequest