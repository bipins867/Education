const express = require("express");

const testSeriesRouter = require("./TestSeries/testSeries");
const profileRouter = require("./Profile/profile");
const studentRouter = require("./Student/student");


const { teacherAuthentication } = require("../../../Middleware/auth");

const router = express.Router();

router.use("/testSeries", teacherAuthentication, testSeriesRouter);
router.use("/profile", teacherAuthentication, profileRouter);
router.use("/student", teacherAuthentication, studentRouter);

module.exports = router;
