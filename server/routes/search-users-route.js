const express = require("express");

const {searchUsers} = require("../controllers/search-controller/search-controller");;


const router = express.Router();

router.get("/get",searchUsers);


module.exports = router;