const express = require("express");
    
const getRouter = require("./Get/get");
const testRouter = require("./Test/test");

const router = express.Router();

router.use("/get", getRouter);
router.use("/test", testRouter);

module.exports = router;
