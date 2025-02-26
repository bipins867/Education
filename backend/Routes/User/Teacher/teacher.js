const express = require("express");

const testSeriesRouter = require("./TestSeries/testSeries");
const { userAuthentication } = require("../../../Middleware/auth");

const router = express.Router();

router.use("/testSeries",userAuthentication, testSeriesRouter);

module.exports = router;
