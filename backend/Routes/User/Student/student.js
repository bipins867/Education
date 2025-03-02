const express = require("express");

const testSeriesRouter = require("./TestSeries/testSeries");
const profileRouter = require("./Profile/profile");

const { userAuthentication,studentAuthentication } = require("../../../Middleware/auth");

const router = express.Router();

router.use("/testSeries",userAuthentication, studentAuthentication, testSeriesRouter);
router.use("/profile",userAuthentication, studentAuthentication, profileRouter);

module.exports = router;
