const express = require("express");

const authRouter = require("./Auth/auth");

const adminController = require("../../Controller/Admin/admin");
const instituteRouter = require("./Institute/institute");
const { adminAuthentication } = require("../../Middleware/auth");

const router = express.Router();

router.use("/auth", authRouter);
router.post("/createSSAdmin", adminController.createSSAdmin);
router.use("/institute", adminAuthentication, instituteRouter);

module.exports = router;
