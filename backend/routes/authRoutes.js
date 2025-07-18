const express = require("express");
const router = express.Router();
const { verifyGoogleToken } = require("../controller/authController");

router.post("/google-login", verifyGoogleToken);

module.exports = router;
