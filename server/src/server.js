const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const socket = require("./config/socket");
const { Server } = require("socket.io");

require("dotenv").config();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
// global._io = socketIo;

io.on("connection", socket.socketConnect());

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server run http://localhost:${PORT}`);
});
