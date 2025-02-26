const express = require("express");

const createRouter = require("./Create/create");
const { fileHandlerRouter } = require("../../../FileHandler/fileHandler");
const { FILE_LIMIT_SIZE } = require("../../../../importantInfo");

const router = express.Router();

router.use("/create", fileHandlerRouter("image", FILE_LIMIT_SIZE), createRouter);

module.exports = router;
