const express = require("express");

const testController = require("../../../../../Controller/User/Student/TestSeries/Test/test");

const router = express.Router();

router.post("/startTest", testController.startTest);
router.post("/attemptQuestion", testController.attemptQuestion);
router.post("/submitTest", testController.submitTest);
router.post("/getTestResults", testController.getTestResults);

module.exports = router;
