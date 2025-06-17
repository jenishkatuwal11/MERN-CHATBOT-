const express = require("express");
const { userRegister } = require("../controller/userController");

const router = express.Router();

router.post("/register", userRegister);

module.exports = router;
