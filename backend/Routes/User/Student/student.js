const express = require("express");

const testSeriesRouter = require("./TestSeries/testSeries");
const profileRouter = require("./Profile/profile");
const teacherRouter = require("./Teacher/teacher");


const router = express.Router();

router.use("/testSeries", testSeriesRouter);
router.use("/profile", profileRouter);
router.use("/teacher", teacherRouter);
module.exports = router;
