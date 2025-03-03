const express = require("express");
const teacherController = require("../../../../Controller/User/Student/Teacher/teacher");

const router = express.Router();

router.post("/subscribeToTeacher",teacherController.subscribeToTeacher); 
router.get("/subscribedTeachers",teacherController.getSubscribedTeachers);
router.get("/teachersList",teacherController.getTeachersList);

module.exports = router;
