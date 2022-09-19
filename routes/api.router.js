const express = require("express");
const router = express.Router();

const helloworld = require("./api/helloworld.router");

router.use("/helloworld", helloworld);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

module.exports = router;
