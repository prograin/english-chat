import {
  indexUserRepository,
  indexUserByIdRepository,
  getUserByIdRepository,
  deleteUserRepository,
  updateUserRepository,
  bulkUpdateUsersRepository,
} from "../repositories/users.repository.js";

export const createUserService = async (user) => {
  return indexUserRepository(user);
};

export const createUserByIdService = async (id, user) => {
  return indexUserByIdRepository(id, user);
};

export const getUserByIdService = async (id) => {
  const result = await getUserByIdRepository(id);
  return result._source;
};

export const deleteUserService = async (id) => {
  return deleteUserRepository(id);
};

export const updateUserService = async (id, fieldsToUpdate) => {
  return updateUserRepository(id, fieldsToUpdate);
};

export const bulkUpdateUsersService = async (users) => {
  const result = await bulkUpdateUsersRepository(users);

  if (result.errors) {
    const errors = result.items
      .filter((item) => item.update?.error)
      .map((item) => ({ id: item.update._id, error: item.update.error }));
    throw new Error(`Bulk update errors: ${JSON.stringify(errors)}`);
  }

  return result;
};
