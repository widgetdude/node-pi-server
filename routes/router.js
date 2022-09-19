const express = require("express");
const router = express.Router();

router.use("/", require("./api.router"));

module.exports = router;
