
const express = require("express");
const router = express.Router();
const { chatList } = require("../controllers/chatController");

router.post("/chat-list", chatList);

module.exports = router;