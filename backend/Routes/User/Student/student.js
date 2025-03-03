const express = require("express");

const testSeriesRouter = require("./TestSeries/testSeries");
const profileRouter = require("./Profile/profile");
const teacherRouter = require("./Teacher/teacher");

const { studentAuthentication } = require("../../../Middleware/auth");

const router = express.Router();

router.use("/testSeries", studentAuthentication, testSeriesRouter);
router.use("/profile", studentAuthentication, profileRouter);
router.use("/teacher", studentAuthentication, teacherRouter);
module.exports = router;
