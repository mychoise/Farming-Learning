let ioInstance;

export const initSocket = (io) => {
  ioInstance = io;
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("join_post", (postId) => {
      socket.join(`post:${postId}`);
      console.log(`user joined post:${postId}`);
    });

    socket.on("leave_post", (postId) => {
      socket.leave(`post:${postId}`);
      console.log(`user left post:${postId}`);
    });

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
