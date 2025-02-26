const express = require("express");

const deleteController = require("../../../../../Controller/User/Teacher/TestSeries/Delete/delete");

const router = express.Router();

router.post("/category", deleteController.deleteCategory);
router.post("/series", deleteController.deleteSeries);
router.post("/test", deleteController.deleteTest);
router.post("/question", deleteController.deleteQuestion);
router.post("/option", deleteController.deleteOption);

module.exports = router;
