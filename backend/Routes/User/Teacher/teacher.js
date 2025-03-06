const express = require("express");

const testSeriesRouter = require("./TestSeries/testSeries");
const profileRouter = require("./Profile/profile");
const studentRouter = require("./Student/student");
const bannerRouter = require("./Banner/banner");
const { getTeachers } = require("../../../Controller/User/Teacher/teacher");

const router = express.Router();

router.use("/testSeries", testSeriesRouter);
router.use("/profile", profileRouter);
router.use("/student", studentRouter);
router.use("/banner", bannerRouter);

router.get("/getTeachers", getTeachers);

module.exports = router;
