const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello From Pi Server Root" });
});
router.use("/api", require("./api.router"));

module.exports = router;
