import { Op } from "sequelize";
import usersModel from "../models/users.model.js";
import UsersRepository from "../repositories/users.repository.js";

// ------------------------------------------------------
// SET
// ------------------------------------------------------

//Create New User When User Start Telegram -->>  If Exists ,it will bre returned
export const createUserTelegramService = async (date) => {
  const existUser = await UsersRepository.getUserByTelegramId(data.telegram_id);
  if (existUser) {
    return { error: true, message: "User already exists" };
  }

  const user = await usersRepository.createUser(date);
  return { error: false, data: user };
};

// ------------------------------------------------------
// GET
// ------------------------------------------------------

// Get user by its id
export const getUserService = async (id) => {
  try {
    const user = await UsersRepository.getUserById(id);

    if (!user) {
      return { error: true, message: "User not found" };
    }

    return { error: false, data: user };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: true, message: "Server error" };
  }
};

// Get all users
export const getAllUsersService = async () => {
  return await UsersRepository.listUsers();
};
