const express = require("express");

const getController = require("../../../../../Controller/User/Teacher/TestSeries/Get/get");

const router = express.Router();

router.post("/category", getController.getCategory);
router.post("/series", getController.getSeries);
router.post("/test", getController.getTest);
router.post("/question", getController.getQuestion);
router.post("/option", getController.getOption);

module.exports = router;
