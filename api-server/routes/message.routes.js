import express from "express";

import { authenticate } from "../middlewares/auth.middleware.js";

import { getRoomMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.get( "/:roomId", authenticate, getRoomMessages );

export default router;