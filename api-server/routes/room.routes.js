import express from "express";

import {
  authenticate,
} from "../middlewares/auth.middleware.js";

import {
  createRoom,
} from "../controllers/room.controller.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  createRoom
);

export default router;