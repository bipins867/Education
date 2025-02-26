const express = require("express");

const createController = require("../../../../../Controller/User/Teacher/TestSeries/Create/create");

const router = express.Router();

router.post("/category", createController.createCategory);
router.post("/series", createController.createSeries);
router.post("/test", createController.createTest);
router.post("/question", createController.createQuestion);
router.post("/option", createController.createOption);

module.exports = router;
