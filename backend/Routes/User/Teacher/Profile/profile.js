const express = require("express");
const profileController = require("../../../../Controller/User/Teacher/Profile/profile");
const { fileHandlerRouter } = require("../../../FileHandler/fileHandler");
const { FILE_LIMIT_SIZE } = require("../../../../importantInfo");

const router = express.Router();

router.get("/get", profileController.getProfile);
router.post(
  "/update",
  fileHandlerRouter("image", FILE_LIMIT_SIZE),
  profileController.updateProfile
);

module.exports = router;
