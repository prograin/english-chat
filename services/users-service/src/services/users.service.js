import UsersCache from "../cache/users.cache.js";
import { createUser, deleteUser, getUser, getUserByTelegramId } from "../repositories/users.repository.js";
import { usersResponseSchema } from "../schemas/users.schema.js";
import validateUtil from "../utils/validate.util.js";
import axios from "axios";
import { createProfileService } from "./profile.service.js";
import { AdminAxiosInstance } from "../utils/axios.util.js";
import { dropNullFields } from "../utils/objects.util.js";

// ------------------------------------------------------
// SET
// ------------------------------------------------------

/**
 * Create New User When User Start Telegram -->>  If Exists ,it will be returned
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export const createUserService = async (data) => {
  const existingUser = await getUser(data.id);

  if (existingUser) {
    const value = await validateUtil(usersResponseSchema, existingUser.toJSON(), false, true);
    await UsersCache.addUser(existingUser.id, value);
    const error = new Error("User already exists");
    error.status = 409;
    throw error;
  }

  const cleaned = dropNullFields(data);

  let user, presence, profile, search;

  try {
    user = await createUser(cleaned);
    profile = await createProfileService({ user_id: Number(user.id) });
    presence = await AdminAxiosInstance.post(`http://localhost:3001/users/${user.id}/presence/`);
    search = await AdminAxiosInstance.post(`http://localhost:3005/documents/users/${user.id}`, { user_id: user.id, username: user_id });
  } catch (err) {
    if (user) await deleteUser(user.id);

    throw err;
  }

  const value = await validateUtil(usersResponseSchema, user.toJSON(), false, true);
  await UsersCache.addUser(user.id, value);

  return value;
};

// ------------------------------------------------------
// GET
// ------------------------------------------------------

/**
 * Get user by its id
 * @param {number} id
 * @returns
 */
export const getUserService = async (id) => {
  let user;
  user = await UsersCache.getUser(id);
  if (user) return user;

  user = await getUser(id);
  if (user) {
    const value = await validateUtil(usersResponseSchema, user.toJSON(), false, true);
    await UsersCache.addUser(id, value);
    return value;
  } else {
    await UsersCache.deleteUser(id);
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
};

/**
 * Get user by telegram id
 * @param {Number} id
 * @returns
 */
export const getUserByTelegramIdService = async (id) => {
  const user = await getUserByTelegramId(id);
  if (user) {
    const value = await validateUtil(usersResponseSchema, user.toJSON(), false, true);
    await UsersCache.addUser(user.id, value);
    return value;
  } else {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
};

/**
 * Delete user by id
 * @param {Number} id
 * @returns
 */
export const deleteUserService = async (id) => {
  const user = await getUser(id);
  if (user) {
    return await deleteUser(id);
  } else {
    const error = new Error(`User ${id} was not found`);
    error.status = 404;
    throw error;
  }
};
