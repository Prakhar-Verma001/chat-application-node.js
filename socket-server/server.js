import express from "express";
import http from "http";

import { Server }
from "socket.io";

import dotenv from "dotenv";
import { verifyToken } from "../shared/config/jwt";

dotenv.config();

const app = express();

const server =
  http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {

  try {

    const token =
      socket.handshake.auth.token;

    if (!token) {
      return next(
        new Error("Unauthorized")
      );
    }

    const decoded =
      verifyToken(token);

    socket.user = decoded;

    next();

  } catch (error) {

    next(
      new Error("Invalid token")
    );

  }

});

io.on("connection", (socket) => {

  

});

io.on("connection", (socket) => {

  console.log(`User connected: ${socket.user.email}`); 

  socket.on(
    "join-room",
    (roomId) => {

      socket.join(roomId);

      console.log(
        `${socket.user.email} joined ${roomId}`
      );

    }
  );

  socket.on(
    "send-message",
    async ({
      roomId,
      message,
    }) => {

      io.to(roomId).emit(
        "receive-message",
        {
          sender: socket.user.email,
          message,
        }
      );

    }
  );

});

const PORT =
  process.env.SOCKET_PORT || 5001;

server.listen(PORT, () => {
  console.log(
    `Socket server running on ${PORT}`
  );
});