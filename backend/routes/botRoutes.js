const express = require("express");
const router = express.Router();
const { LlamaChat } = require("../controller/chatController");

router.post("/chat", LlamaChat);

module.exports = router;
