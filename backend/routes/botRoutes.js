const express = require("express");
const router = express.Router();
const { GeminiChat } = require("../controller/chatController");

router.post("/chat", GeminiChat);

module.exports = router;
