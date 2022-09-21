const express = require("express");
const router = express.Router();

const helloworld = require("./api/helloworld.router");

router.use("/helloworld", helloworld);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello From Pi Server Api Root" });
});

module.exports = router;
