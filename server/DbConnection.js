const mongoose=require("mongoose");

const connectToDb=async(url)=>{
    try {
        await mongoose.connect(url)
        console.log("connected to DB successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectToDb;