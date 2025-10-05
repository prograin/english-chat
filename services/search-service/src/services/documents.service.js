import {
  indexDocumentRepository,
  indexDocumentByIdRepository,
  getDocumentByIdRepository,
  deleteDocumentRepository,
  updateDocumentByIdRepository,
  bulkUpdateDocumentsRepository,
  checkDocumentExistsRepository,
} from "../repositories/documents.repository.js";

export const createDocService = async (index, document) => {
  return await indexDocumentRepository(index, document);
};

export const createDocByIdService = async (index, id, document) => {
  const exists = await checkDocumentExistsRepository(index, id);
  if (exists) {
    const error = new Error();
    error.status = 401;
    throw error;
  }
  return await indexDocumentByIdRepository(index, id, document);
};

export const getDocByIdService = async (index, id) => {
  const result = await getDocumentByIdRepository(index, id);
  return result._source;
};

export const deleteDocService = async (index, id) => {
  return await deleteDocumentRepository(index, id);
};

export const updateDocByIdService = async (index, id, fieldsToUpdate) => {
  return await updateDocumentByIdRepository(index, id, fieldsToUpdate);
};

export const bulkUpdateDocsService = async (index, documents) => {
  const result = await bulkUpdateDocumentsRepository(index, documents);

  if (result.errors) {
    const errors = result.items.filter((item) => item.update?.error).map((item) => ({ id: item.update._id, error: item.update.error }));
    throw new Error(`Bulk update errors: ${JSON.stringify(errors)}`);
  }

  return result;
};
