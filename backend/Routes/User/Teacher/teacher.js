const express = require("express");

const testSeriesRouter = require("./TestSeries/testSeries");
const profileRouter = require("./Profile/profile");

const { userAuthentication,teacherAuthentication } = require("../../../Middleware/auth");

const router = express.Router();

router.use("/testSeries",userAuthentication, teacherAuthentication, testSeriesRouter);
router.use("/profile",userAuthentication, teacherAuthentication, profileRouter);

module.exports = router;
