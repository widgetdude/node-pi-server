const express = require("express");
const app = express();
require("./services/socket.client");

app.use("/api", require("./routes/api.router"));

module.exports = app;
