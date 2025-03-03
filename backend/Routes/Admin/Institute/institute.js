const express = require("express");

const instituteController = require("../../../Controller/Admin/Institute/institute");
const { fileHandlerRouter } = require("../../FileHandler/fileHandler");
const { FILE_LIMIT_SIZE } = require("../../../importantInfo");

const router = express.Router();

router.post(
  "/createInstitute",
  fileHandlerRouter("image", FILE_LIMIT_SIZE),
  instituteController.createInstitute
);

module.exports = router;
