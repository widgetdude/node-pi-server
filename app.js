const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

app.use("/api", require("./routes/api.router"));

module.exports = app;
