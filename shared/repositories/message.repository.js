import { pool } from "../config/db.js";

export const saveMessageRepository = async ({ roomId, senderId, content }) => {

  const query = `
    INSERT INTO messages (
      room_id,
      sender_id,
      content
    )
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [
    roomId,
    senderId,
    content,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getLatestMessagesRepository = async (roomId) => {

  const query = `
    SELECT
      m.id,
      m.content,
      m.created_at,

      u.id AS sender_id,
      u.username,
      u.email

    FROM messages m

    INNER JOIN users u
    ON u.id = m.sender_id

    WHERE m.room_id = $1

    ORDER BY m.created_at DESC

    LIMIT 20
  `;

  const values = [roomId];

  const result = await pool.query(query, values);

  return result.rows.reverse();
};