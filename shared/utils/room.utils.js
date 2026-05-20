import { checkRoomMembership } from "../repositories/room.repository.js";

export const isRoomMember = async ({ roomId, userId }) => {

  const membership = await checkRoomMembership({ roomId, userId });

  return !!membership;
};