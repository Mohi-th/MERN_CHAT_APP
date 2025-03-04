const express = require("express");

const {handleSendingMessage,
    handleFetchingAllMessages
    
} = require("../controllers/chats/chat-controller");;


const router = express.Router();

router.post("/send",handleSendingMessage);
router.get("/get/:chatId",handleFetchingAllMessages);


module.exports = router;