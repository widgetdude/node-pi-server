const express = require("express");
const router = express.Router();

const { helloWorld } = require("../../controllers/helloworld.controller");

router.route("/").get((req, res) => {
  const message = helloWorld();
  res.status(200).json({ message });
});

module.exports = router;
