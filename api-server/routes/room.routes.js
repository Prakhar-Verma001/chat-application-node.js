import express from "express";

import { authenticate } from "../middlewares/auth.middleware.js";

import { 
    createRoom, 
    deleteRoom, 
    joinRoom, 
    leaveRoom 
} from "../controllers/room.controller.js";

const router = express.Router();

router.post("/", authenticate, createRoom);

router.post( "/:roomId/join", authenticate, joinRoom );

router.post( "/:roomId/leave", authenticate, leaveRoom );

router.delete( "/:roomId", authenticate, deleteRoom );

export default router;