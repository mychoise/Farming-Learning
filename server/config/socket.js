let ioInstance;

export const initSocket = (io) => {
  ioInstance = io;
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};

export const getIO = () => {
  if (!ioInstance) {
    throw new Error("Socket.io not initialized!");
  }
  return ioInstance;
};
