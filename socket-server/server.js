import express from "express";
import http from "http";

import { Server } from "socket.io";

import dotenv from "dotenv";
import { verifyToken } from "../shared/config/jwt.js";

import {
  saveMessageRepository,
  getLatestMessagesRepository,
} from "../shared/repositories/message.repository.js";

import {
  isRoomMember,
} from "../shared/utils/room.utils.js";

import {
  roomMessagesCache,
} from "./store/message.store.js";
import { onlineUsers } from "./store/socket.store.js";

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {

  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(
        new Error("Unauthorized")
      );
    }

    const decoded = verifyToken(token);

    socket.user = decoded;

    next();

  } catch (error) {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {

  console.log(`User connected: ${socket.user.email}`); 

  const userId = socket.user.id;

  if (!onlineUsers.has(userId)) {
    onlineUsers.set( userId, new Set() );
  }

  onlineUsers.get(userId).add(socket.id);

  socket.on("join-room", async (roomId) => {

    socket.join(roomId);

    if (!roomMessagesCache.has(roomId)) {

      const messages = await getLatestMessagesRepository( roomId );

      roomMessagesCache.set( roomId, messages );
    }
    socket.emit("previous-messages", roomMessagesCache.get(roomId));
  });

  socket.on("send-message", async ({ roomId, content }) => {

    try {

      const userId = socket.user.id;

      const isMember = await isRoomMember({ roomId, userId });

      if (!isMember) {
        return socket.emit(
          "error-message",
          "You are not a member of this room"
        );
      }

      const savedMessage =
        await saveMessageRepository({
          roomId,
          senderId: userId,
          content,
        });

      const messagePayload = {
        id: savedMessage.id,
        roomId,
        content,
        sender: {
          id: socket.user.id,
          email: socket.user.email,
        },
        createdAt:
          savedMessage.created_at,
      };

      if (
        !roomMessagesCache.has(roomId)
      ) {

        roomMessagesCache.set(
          roomId,
          []
        );

      }

      const roomMessages =
        roomMessagesCache.get(roomId);

      roomMessages.push(messagePayload);

      if (roomMessages.length > 20) {
        roomMessages.shift();
      }

      io.to(roomId).emit(
        "receive-message",
        messagePayload
      );

    } catch (error) {

      socket.emit(
        "error-message",
        error.message
      );

    }

  });

  socket.on("disconnect", () => {

    const userId = socket.user.id;

    const userSockets = onlineUsers.get(userId);

    if (userSockets) {

      userSockets.delete(socket.id);

      if (userSockets.size === 0) {

        onlineUsers.delete(userId);

        console.log(`User offline: ${userId}`);
      }
    }
    console.log(`Socket disconnected: ${socket.id}`);
  });

});

const PORT = process.env.SOCKET_PORT || 5001;

server.listen(PORT, () => {
  console.log(`Socket server running on ${PORT}`);
});