const express = require("express");
const router = express.Router();
const { DeepSeekR1 } = require("../controller/chatController");

router.post("/chat", DeepSeekR1);

module.exports = router;
