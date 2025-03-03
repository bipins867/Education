const express = require("express");

const studentController = require("../../../../Controller/User/Teacher/Student/student");
const router = express.Router();


router.get("/subscribedStudents",studentController.getSubscribedStudents);
router.post("/studentDetails",studentController.getStudentDetails);
router.post("/searchStudent",studentController.searchStudent);

module.exports = router;

