const express = require("express");

const getController = require("../../../../../Controller/User/Teacher/TestSeries/Get/get");

const router = express.Router();

router.post("/categories", getController.getCategories);
router.post("/series", getController.getSeries);
router.post("/tests", getController.getTests);
router.post("/questions", getController.getQuestions);
router.post("/options", getController.getOptions);

module.exports = router;
