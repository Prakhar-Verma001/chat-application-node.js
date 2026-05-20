import bcrypt from "bcrypt";

import {
  findUserByEmail,
  createUser,
} from "../../shared/repositories/user.repository.js";

import {
  generateToken,
} from "../../shared/config/jwt.js";

export const registerUserService = async ({
  username,
  email,
  password,
}) => {

  const existingUser =
    await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const passwordHash =
    await bcrypt.hash(password, 10);

  const user = await createUser({
    username,
    email,
    passwordHash,
  });

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  return {
    user,
    token,
  };
};

export const loginUserService = async ({
  email,
  password,
}) => {

  const user =
    await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatched =
    await bcrypt.compare(
      password,
      user.password_hash
    );

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    token,
  };
};