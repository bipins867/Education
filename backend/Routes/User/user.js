const express = require("express");

const authRouter=require('./Auth/auth');
const teacherRouter=require('./Teacher/teacher');

const router = express.Router();

router.use('/auth',authRouter);
router.use('/teacher',teacherRouter);

module.exports = router;
