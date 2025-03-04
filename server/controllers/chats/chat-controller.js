const FriendRequest = require("../../models/friend-requests")
const Message = require("../../models/messages")
const Chats = require("../../models/chats")
const User = require("../../models/user")
const mongoose = require("mongoose")



const handleSendingFriendRequest = async (req, res) => {

    try {

        const { sender, receiver } = req.body;

        if (!sender || !receiver) {
            return res.status(400).json({
                success: false,
                message: "require both sender and reciever Id's"
            })
        }

        const friendRequest = await FriendRequest.create({
            sender,
            receiver
        })

        await friendRequest.populate([
            "sender",
            "receiver"
        ])


        if (!friendRequest) {
            return res.status(400).json({
                success: false,
                message: "some error has occured"
            })
        }

        res.status(200).json({
            success: true,
            data: friendRequest,
            message: "Friend request sent"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error has occured in handleSendingFriendRequest"
        })
    }
}

const handleFetchingAllFriendRequest = async (req, res) => {

    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "user id required"
            })
        }

        const friendRequests = await FriendRequest.find({ $or: [{ receiver: id }, { sender: id }] }).populate([
            "sender",
            "receiver"
        ])

        if (!friendRequests) {
            return res.status(400).json({
                success: false,
                message: "some error has occured"
            })
        }

        res.status(200).json({
            success: true,
            data: friendRequests,
            message: "all friend requests have been retrieved"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error has occured in retrieved"
        })
    }
}

const handleFriendRequestReject = async (req, res) => {

    try {

        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "user id required"
            })
        }
        console.log("Received ID:", id, "Length:", id.length);


        console.log(typeof (id));

        const deletedFriendRequest = await FriendRequest.findByIdAndDelete(id);

        if (!deletedFriendRequest) {
            return res.status(400).json({
                success: false,
                message: "some error has occured"
            })
        }

        res.status(200).json({
            success: true,
            data: deletedFriendRequest,
            message: "all friend requests have been retrieved"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error has occured in "
        })
    }
}

const handleCreatingChats = async (req, res) => {

    try {

        const { participants, groupName, groupImage,isGroup, requestId } = req.body

        if (!participants) {
            return res.status(400).json({
                success: false,
                message: "participants, groupName, groupImage required"
            })
        }



        const chats = await Chats.create({
            groupName,
            participants,
            groupImage,
            isGroup,
        });

        await chats.populate('participants')

        if (!chats) {
            return res.status(400).json({
                success: false,
                message: "some error has occured"
            })
        }

        if (requestId){
            await FriendRequest.findByIdAndDelete(requestId)
        }

        res.status(200).json({
            success: true,
            data: chats,
            message: "Chats created successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error has occured in handleSendingFriendRequest"
        })
    }
}



const handleFetchingAllChats = async (req, res) => {

    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "user id required"
            })
        }

        const chats = await Chats.find({ participants: id }).populate("participants")

        if (!chats) {
            return res.status(400).json({
                success: false,
                message: "some error has occured"
            })
        }


        res.status(200).json({
            success: true,
            data: chats,
            message: "all chats are retrieved"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error has occured in handleSendingFriendRequest"
        })
    }
}

const handleSendingMessage = async (req, res) => {

    try {

        const { sender, chatId, message } = req.body;

        if (!sender || !chatId || !message) {
            return res.status(400).json({
                success: false,
                message: "sender,participants,message required"
            })
        }


        const newMessage = await Message.create({
            sender,
            chatId,
            message,
        });

        if (!newMessage) {
            return res.status(400).json({
                success: false,
                message: "some error has occured"
            });
        }

        res.status(200).json({
            success: true,
            data: newMessage,
            message: "message sent successfully"
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error has occured while sending message"
        })
    }

}

const handleFetchingAllMessages = async (req, res) => {

    try {

        const { chatId } = req.params

        if (!chatId) {
            return res.status(400).json({
                success: false,
                message: "participants required"
            })
        }


        const messages = await Message.find({ chatId } );

        if (!messages) {
            return res.status(400).json({
                success: false,
                message: "some error has occured"
            })
        }

        res.status(200).json({
            success: true,
            data: messages,
            message: "message sent successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error has occured in handleSendingFriendRequest"
        })
    }

}

module.exports = {
    handleSendingFriendRequest,
    handleFetchingAllFriendRequest,
    handleFriendRequestReject,
    handleCreatingChats,
    handleFetchingAllChats,
    handleSendingMessage,
    handleFetchingAllMessages
}