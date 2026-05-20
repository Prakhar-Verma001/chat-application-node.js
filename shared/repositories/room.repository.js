import { pool } from "../config/db.js";

export const createRoomRepository = async ({ name, createdBy }) => {

  const query = `
    INSERT INTO rooms (
      name,
      created_by
    )
    VALUES ($1, $2)
    RETURNING *
  `;

  const values = [
    name,
    createdBy,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const findRoomById = async ( roomId ) => {

  const query = `
    SELECT *
    FROM rooms
    WHERE id = $1
  `;

  const values = [roomId];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const checkRoomMembership = async ({ roomId, userId }) => {

  const query = `
    SELECT *
    FROM room_members
    WHERE room_id = $1
    AND user_id = $2
  `;

  const values = [
    roomId,
    userId,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const joinRoomRepository = async ({ roomId, userId }) => {

  const query = `
    INSERT INTO room_members (
      room_id,
      user_id
    )
    VALUES ($1, $2)
    RETURNING *
  `;

  const values = [
    roomId,
    userId,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const removeRoomMembership = async ({ roomId, userId }) => {

  const query = `
    DELETE FROM room_members
    WHERE room_id = $1
    AND user_id = $2
    RETURNING *
  `;

  const values = [
    roomId,
    userId,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const deleteRoomRepository = async ({ roomId, userId }) => {

  const query = `
    DELETE FROM rooms
    WHERE id = $1
    AND created_by = $2
    RETURNING *
  `;

  const values = [
    roomId,
    userId,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};