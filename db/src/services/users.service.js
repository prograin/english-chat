import usersCache from "../cache/users.cache.js";
import { UsersCacheHelper } from "../helpers/cache.helper.js";
import { UsersDBHelper } from "../helpers/db.helper.js";
import UsersRepository from "../repositories/users.repository.js";

// ------------------------------------------------------
// SET
// ------------------------------------------------------

//Create New User When User Start Telegram -->>  If Exists ,it will bre returned
export const createUserService = async (date) => {
  let user;
  user = UsersCacheHelper.getUser(date);
  if (user) {
    return { error: true, message: "User already exists" };
  }

  user = UsersDBHelper.getUser(date);
  if (user) {
    return { error: true, message: "User already exists" };
  }

  user = await usersRepository.createUser(date);
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

// Get user by telegram id
export const getUserByTelegramIdService = async (id) => {
  try {
    const user = await UsersRepository.getUserByTelegramId(id);
    if (!user) {
      return { error: true, message: "User not found" };
    }

    usersCache.addUser(user.id, user);

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
