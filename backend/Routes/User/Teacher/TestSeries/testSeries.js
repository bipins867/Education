const express = require("express");

const createRouter = require("./Create/create");
const deleteRouter = require("./Delete/delete");
const updateRouter = require("./Update/update");
const getRouter = require("./Get/get");

const { fileHandlerRouter } = require("../../../FileHandler/fileHandler");
const { FILE_LIMIT_SIZE } = require("../../../../importantInfo");

const router = express.Router();

router.use(
  "/create",
  fileHandlerRouter("image", FILE_LIMIT_SIZE),
  createRouter
);
router.use(
  "/update",
  fileHandlerRouter("image", FILE_LIMIT_SIZE),
  updateRouter
);

router.use("/delete", deleteRouter);
router.use("/get", getRouter);

module.exports = router;
