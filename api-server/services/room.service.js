import { 
  checkRoomMembership, 
  createRoomRepository, 
  deleteRoomRepository, 
  findRoomById, 
  joinRoomRepository, 
  removeRoomMembership 
} from "../../shared/repositories/room.repository.js";

export const createRoomService = async ({ name, userId }) => {

  const room = await createRoomRepository({
    name,
    createdBy: userId,
  });

  return room;
};

export const joinRoomService = async ({ roomId, userId }) => {

  const room = await findRoomById(roomId);

  if (!room) {
    throw new Error("Room not found");
  }

  const existingMembership = await checkRoomMembership({ roomId, userId });

  if (existingMembership) {
    throw new Error(
      "User already joined this room"
    );
  }

  const membership = await joinRoomRepository({ roomId, userId });

  return membership;
};

export const leaveRoomService = async ({ roomId, userId }) => {

  const room = await findRoomById(roomId);

  if (!room) {
    throw new Error("Room not found");
  }

  const existingMembership = await checkRoomMembership({ roomId, userId });

  if (!existingMembership) {
    throw new Error(
      "User is not a member of this room"
    );
  }

  const removedMembership = await removeRoomMembership({ roomId, userId });

  return removedMembership;
};

export const deleteRoomService = async ({ roomId, userId }) => {

  const room = await findRoomById(roomId);

  if (!room) {
    throw new Error("Room not found");
  }

  const deletedRoom = await deleteRoomRepository({ roomId, userId });

  if (!deletedRoom) {
    throw new Error(
      "Only room creator can delete room"
    );
  }

  return deletedRoom;
};