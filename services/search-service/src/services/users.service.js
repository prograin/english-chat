import {
  indexDocumentRepository,
  indexDocumentByIdRepository,
  getDocumentByIdRepository,
  deleteDocumentRepository,
  updateDocumentRepository,
  bulkUpdateDocumentsRepository,
} from "../repositories/documents.repository.js";

export const createUserService = async (user) => {
  return indexDocumentRepository("users", user);
};

export const createUserByIdService = async (id, user) => {
  return indexDocumentByIdRepository("users", id, user);
};

export const getUserByIdService = async (id) => {
  const result = await getDocumentByIdRepository("users", id);
  return result._source;
};

export const deleteUserService = async (id) => {
  return deleteDocumentRepository("users", id);
};

export const updateUserService = async (id, fieldsToUpdate) => {
  return updateDocumentRepository("users", id, fieldsToUpdate);
};

export const bulkUpdateUsersService = async (users) => {
  const result = await bulkUpdateDocumentsRepository("users", users);

  if (result.errors) {
    const errors = result.items.filter((item) => item.update?.error).map((item) => ({ id: item.update._id, error: item.update.error }));
    throw new Error(`Bulk update errors: ${JSON.stringify(errors)}`);
  }

  return result;
};
