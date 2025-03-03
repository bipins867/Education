const express = require("express");

const authController = require("../../../Controller/Institute/Auth/auth");

const router = express.Router();

router.post("/login", authController.instituteLogin);

module.exports = router;
