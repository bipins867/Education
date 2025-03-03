const express = require("express");
const usersAuthController = require("../../../Controller/User/Auth/users");
const {
  middlewareSendOtp,
  middlewareVerifyOtp,
} = require("../../../Middleware/otpAuthentication");

const router = express.Router();

router.post(
  "/studentLogin",
  // middlewareSendOtp,
  // middlewareVerifyOtp,
  usersAuthController.studentAuth
);

router.post(
  "/teacherLogin",
  // middlewareSendOtp,
  // middlewareVerifyOtp,
  usersAuthController.teacherAuth
);
module.exports = router;
