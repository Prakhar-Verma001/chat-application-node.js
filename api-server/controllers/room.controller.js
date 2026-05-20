import {
  createRoomService,
} from "../services/room.service.js";

export const createRoom =
async (req, res) => {

  try {

    const room =
      await createRoomService({
        name: req.body.name,
        userId: req.user.id,
      });

    res.status(201).json({
      success: true,
      room,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};