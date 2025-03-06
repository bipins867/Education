const express = require("express");

const {
  createBanner,
  getBanners,
  updateBanner,
  deleteBanner,
} = require("../../../../Controller/User/Teacher/Banner/banner");

const { fileHandlerRouter } = require("../../../FileHandler/fileHandler");
const { FILE_LIMIT_SIZE } = require("../../../../importantInfo");

const router = express.Router();

router.post(
  "/create",
  fileHandlerRouter("image", FILE_LIMIT_SIZE),
  createBanner
);
router.post("/get", getBanners);
router.post("/update", updateBanner);
router.post("/delete", deleteBanner);

module.exports = router;
