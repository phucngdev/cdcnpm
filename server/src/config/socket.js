module.exports.socketConnect = () => {
  return (socket) => {
    socket.on("sendDataClient", (data) => {
      _io.emit("sendMessage", { data });
    });

    // disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  };
};
