const express = require("express");

const authRouter=require('./Auth/auth');
const teacherRouter=require('./Teacher/teacher');
const studentRouter=require('./Student/student');
const { studentAuthentication,teacherAuthentication } = require("../../Middleware/auth");
const router = express.Router();

router.use('/auth',authRouter);
router.use('/teacher',teacherAuthentication,teacherRouter);
router.use('/student',studentAuthentication,studentRouter);

module.exports = router;
