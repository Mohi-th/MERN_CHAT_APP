const User = require("../../models/user")


const searchUsers = async (req, res) => {

    try {
        const { keyword } = req.query

        const regEx=new RegExp(keyword);

        const query=keyword.length>0?{
            $or:[
                {userName:regEx},
                {userId:regEx},
                {email:regEx},
            ]
        }:{};



        const searchUsers=await User.find(query);
        
        if(!searchUsers){
            return  res.status(400).json({
                success:false,
                message:"some error has occured"
            })
        }

        res.status(200).json({
            success:true,
            data:searchUsers,
        })

    }

    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error has occured in handleSendingFriendRequest"
        })

    }
}

    module.exports = {searchUsers}