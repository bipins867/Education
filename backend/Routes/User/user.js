const express = require("express");

const authRouter=require('./Auth/auth');
const teacherRouter=require('./Teacher/teacher');
const studentRouter=require('./Student/student');

const router = express.Router();

router.use('/auth',authRouter);
router.use('/teacher',teacherRouter);
router.use('/student',studentRouter);

module.exports = router;
