import {
  indexDocumentRepository,
  indexDocumentByIdRepository,
  getDocumentByIdRepository,
  deleteDocumentRepository,
  updateDocumentRepository,
  bulkUpdateDocumentsRepository,
} from "../repositories/documents.repository.js";

export const createDocService = async (index, user) => {
  return indexDocumentRepository(index, user);
};

export const createDocByIdService = async (index, id, user) => {
  return indexDocumentByIdRepository(index, id, user);
};

export const getDocByIdService = async (index, id) => {
  const result = await getDocumentByIdRepository(index, id);
  return result._source;
};

export const deleteDocService = async (index, id) => {
  return deleteDocumentRepository(index, id);
};

export const updateDocService = async (index, id, fieldsToUpdate) => {
  return updateDocumentRepository(index, id, fieldsToUpdate);
};

export const bulkUpdateDocsService = async (index, users) => {
  const result = await bulkUpdateDocumentsRepository(index, users);

  if (result.errors) {
    const errors = result.items.filter((item) => item.update?.error).map((item) => ({ id: item.update._id, error: item.update.error }));
    throw new Error(`Bulk update errors: ${JSON.stringify(errors)}`);
  }

  return result;
};
