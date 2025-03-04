
const mongoose=require("mongoose")


const chatsSchema=new mongoose.Schema({
    groupName:{
        type:String,
        default:""
    },
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    }],
    groupImage:{
        type:String,
    },
    isGroup:{
        type:Boolean,
        default:false
    }
})

const Chats=mongoose.model("Chats",chatsSchema);

module.exports=Chats;