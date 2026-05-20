import { pool } from "../config/db.js";

export const findUserByEmail = async (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1
  `;

  const values = [email];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const createUser = async ({ username, email, passwordHash }) => {
  const query = `
    INSERT INTO users (
      username,
      email,
      password_hash
    )
    VALUES ($1, $2, $3)
    RETURNING id, username, email, created_at
  `;

  const values = [
    username,
    email,
    passwordHash,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};