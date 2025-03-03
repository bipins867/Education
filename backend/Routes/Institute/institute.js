const express = require("express");

const authRouter = require("./Auth/auth");
const userRouter = require("./User/user");
const { instituteAuthentication } = require("../../Middleware/auth");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user",instituteAuthentication, userRouter);

module.exports = router;
