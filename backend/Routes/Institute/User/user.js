const express = require("express");

const teacherRouter = require("./Teacher/teacher");

const router = express.Router();

router.use("/teacher", teacherRouter);

module.exports = router;
