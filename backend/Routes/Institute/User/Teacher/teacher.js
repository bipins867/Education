const express = require("express");
const createController = require("../../../../Controller/Institute/User/Create/create");


const router = express.Router();

router.post("/create", createController.createTeacher);

module.exports = router;
