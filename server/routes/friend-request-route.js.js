const express = require("express");

const { handleSendingFriendRequest,
    handleFetchingAllFriendRequest,
    handleFriendRequestReject,
    handleCreatingChats
} = require("../controllers/chats/chat-controller");;



const router = express.Router();

router.post("/send",handleSendingFriendRequest);
router.delete("/delete/:id",handleFriendRequestReject);
router.get("/get/:id",handleFetchingAllFriendRequest);
router.post("/accept",handleCreatingChats);


module.exports = router;