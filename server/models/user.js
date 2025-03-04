const mongoose = require("mongoose")

const usersSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    bio:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true 
    }
})

const Users=mongoose.model("Users",usersSchema);

Users.syncIndexes();

module.exports=Users

