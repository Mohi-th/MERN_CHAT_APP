
const express = require("express");

const {handleCreatingChats,
    handleFetchingAllChats,
} = require("../controllers/chats/chat-controller");;



const router = express.Router();

router.post("/create",handleCreatingChats);
router.get("/get/:id",handleFetchingAllChats);

module.exports = router;