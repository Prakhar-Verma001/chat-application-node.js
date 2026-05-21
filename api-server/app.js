import express from "express";

import authRoutes from "./routes/auth.routes.js";

import roomRoutes from "./routes/room.routes.js";

import messageRoutes from "./routes/message.routes.js";

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  if ( err instanceof SyntaxError && err.status === 400 && "body" in err ) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON payload",
    });
  }

  next(err);
});

app.use( "/api/auth", authRoutes );

app.use( "/api/rooms", roomRoutes );

app.use( "/api/messages", messageRoutes );

export default app;