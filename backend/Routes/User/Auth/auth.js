const express = require("express");
const usersAuthController = require("../../../Controller/User/Auth/users");
const {
  middlewareSendOtp,
  middlewareVerifyOtp,
} = require("../../../Middleware/otpAuthentication");

const router = express.Router();

router.post(
  "/login",
  // middlewareSendOtp,
  // middlewareVerifyOtp,
  usersAuthController.userAuth
);

module.exports = router;
