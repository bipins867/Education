const express = require("express");

const updateController = require("../../../../../Controller/User/Teacher/TestSeries/Update/update");

const router = express.Router();

router.post("/category", updateController.updateCategory);
router.post("/series", updateController.updateSeries);
router.post("/test", updateController.updateTest);
router.post("/question", updateController.updateQuestion);
router.post("/option", updateController.updateOption);

module.exports = router;
