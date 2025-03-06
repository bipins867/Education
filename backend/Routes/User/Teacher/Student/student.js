const express = require("express");

const studentController = require("../../../../Controller/User/Teacher/Student/student");
const router = express.Router();

router.get("/getStudents", studentController.getStudents);

module.exports = router;

