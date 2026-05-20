import { getLatestMessagesRepository } from "../../shared/repositories/message.repository.js";

export const getRoomMessages = async (req, res) => {

  try {

    const roomId = req.params.roomId;

    const messages = await getLatestMessagesRepository( roomId );

    return res.status(200).json({
      success: true,
      data: messages,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};