import {
  createRoomRepository,
} from "../../shared/repositories/room.repository.js";

export const createRoomService =
async ({
  name,
  userId,
}) => {

  const room =
    await createRoomRepository({
      name,
      createdBy: userId,
    });

  return room;
};