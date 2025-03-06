const express = require("express");

const testSeriesRouter = require("./TestSeries/testSeries");
const profileRouter = require("./Profile/profile");
const teacherRouter = require("./Teacher/teacher");
const bannerRouter = require("./Banner/banner");

const router = express.Router();

router.use("/testSeries", testSeriesRouter);
router.use("/profile", profileRouter);
router.use("/teacher", teacherRouter);
router.use("/banner", bannerRouter);

module.exports = router;
