import UsersCache from "../cache/users.cache.js";
import UsersRepository from "../repositories/users.repository.js";
import { usersResponseSchema } from "../schemas/users.schema.js";

// ------------------------------------------------------
// SET
// ------------------------------------------------------

//Create New User When User Start Telegram -->>  If Exists ,it will bre returned
//DEBUG
export const createUserService = async (data) => {
  let user;

  user = await UsersRepository.getUser(data.id);
  if (user) {
    await UsersCache.addUser(user.id, user);
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  user = await UsersRepository.createUser(data);
  const { error, value } = usersResponseSchema.validate(user.toJSON(), {
    stripUnknown: true,
    allowUnknown: false,
  });
  if (error) throw error;
  await UsersCache.addUser(user.id, value);
  return value;
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
    const { error, value } = usersResponseSchema.validate(user.toJSON(), {
      stripUnknown: true,
      allowUnknown: false,
    });
    if (error) throw error;
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
    const { error, value } = usersResponseSchema.validate(user.toJSON(), {
      stripUnknown: true,
      allowUnknown: false,
    });
    if (error) throw error;
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
