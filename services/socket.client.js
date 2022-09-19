const socket = require("socket.io-client");

const io = socket("http://localhost:3000");

io.on("connect", () => {
  console.log("Connected to server");
});

io.on("disconnect", () => {
  console.log("Disconnected from server");
});

module.exports = io;
