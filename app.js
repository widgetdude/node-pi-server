const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

app.use("/", require("./routes/router"));

module.exports = app;
