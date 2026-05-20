import { 
  createRoomService, 
  deleteRoomService, 
  joinRoomService, 
  leaveRoomService 
} from "../services/room.service.js";

export const createRoom = async (req, res) => {
  try {
    const room = await createRoomService({ 
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

export const joinRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const userId = req.user.id;

    const result = await joinRoomService({ roomId, userId });

    return res.status(200).json({
      success: true,
      message:
        "Joined room successfully",
      data: result,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

export const leaveRoom = async (req, res) => {

  try {

    const roomId = req.params.roomId;

    const userId = req.user.id;

    const result = await leaveRoomService({ roomId, userId });

    return res.status(200).json({
      success: true,
      message:
        "Left room successfully",
      data: result,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

export const deleteRoom = async (req, res) => {

  try {

    const roomId =
      req.params.roomId;

    const userId =
      req.user.id;

    const result = await deleteRoomService({ roomId, userId });

    return res.status(200).json({
      success: true,
      message:
        "Room deleted successfully",
      data: result,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};