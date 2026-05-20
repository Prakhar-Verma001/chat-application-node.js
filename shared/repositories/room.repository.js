import { pool } from "../config/db.js";

export const createRoomRepository =
async ({
  name,
  createdBy,
}) => {

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

  const result =
    await pool.query(query, values);

  return result.rows[0];
};