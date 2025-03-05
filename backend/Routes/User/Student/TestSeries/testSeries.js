const express = require("express");
    
const getRouter = require("./Get/get");

const router = express.Router();

router.use("/get", getRouter);

module.exports = router;
