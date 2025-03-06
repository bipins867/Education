const express = require("express");

const {
  getBanners,
} = require("../../../../Controller/User/Student/Banner/banner");

const router = express.Router();

router.post("/getBanners", getBanners);

module.exports = router;
