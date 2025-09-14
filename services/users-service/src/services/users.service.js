import UsersCache from "../cache/users.cache.js";
import UsersRepository from "../repositories/users.repository.js";
import { usersResponseSchema } from "../schemas/users.schema.js";
import { validateSchemaUtil } from "../utils/validate.util.js";
import axios from "axios";

// ------------------------------------------------------
// SET
// ------------------------------------------------------

//Create New User When User Start Telegram -->>  If Exists ,it will be returned
export const createUserService = async (data) => {
  try {
    const existingUser = await UsersRepository.getUser(data.id);
    if (existingUser) {
      const value = await validateSchemaUtil(usersResponseSchema, existingUser.toJSON(), false, true);
      await UsersCache.addUser(existingUser.id, value);
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const user = await UsersRepository.createUser(data);

    try {
      await axios.post("http://localhost:3001/presence/", { user_id: Number(user.id) });
    } catch (err) {
      if (err.response.status !== 409) {
        await UsersRepository.deleteUser(user.id);
        throw new Error("Presence creation failed, user deleted");
      }
    }

    const value = await validateSchemaUtil(usersResponseSchema, user.toJSON(), false, true);
    await UsersCache.addUser(user.id, value);

    return value;
  } catch (err) {
    throw err;
  }
};

// ------------------------------------------------------
// GET
// ------------------------------------------------------

// Get user by its id
export const getUserService = async (id) => {
  let user;
  user = await UsersCache.getUser(id);
  if (user) return user;

  user = await UsersRepository.getUser(id);
  if (user) {
    const value = await validateSchemaUtil(usersResponseSchema, user.toJSON(), false, true);
    await UsersCache.addUser(id, value);
    return value;
  } else {
    await UsersCache.deleteUser(id);
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
};

// Get user by telegram id
export const getUserByTelegramIdService = async (id) => {
  const user = await UsersRepository.getUserByTelegramId(id);
  if (user) {
    const value = await validateSchemaUtil(usersResponseSchema, user.toJSON(), false, true);
    await UsersCache.addUser(user.id, value);
    return value;
  } else {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
};

// Get all users
export const getAllUsersService = async () => {
  return await UsersRepository.listUsers();
};
