const express = require("express");
const profileController = require("../../../../Controller/User/Student/Profile/profile");

const router = express.Router();

router.get("/get", profileController.getProfile);
router.post("/update", profileController.updateProfile);

module.exports = router;
