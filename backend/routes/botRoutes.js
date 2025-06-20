const express = require("express");
const router = express.Router();
const { GeminiFlashLite } = require("../controller/chatController");

router.post("/chat", GeminiFlashLite);

module.exports = router;
