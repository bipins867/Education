const express = require("express");

const testSeriesRouter = require("./TestSeries/testSeries");
const profileRouter = require("./Profile/profile");
const studentRouter = require("./Student/student");

const router = express.Router();

router.use("/testSeries", testSeriesRouter);
router.use("/profile", profileRouter);
router.use("/student", studentRouter);

module.exports = router;
