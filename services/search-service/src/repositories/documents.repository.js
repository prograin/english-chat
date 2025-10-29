import esClient from "../config/elastic.js";

export const indexDocumentRepository = async (index, doc) => {
  return esClient.index({
    index: index,
    body: doc || {},
    refresh: true,
  });
};

export const indexDocumentByIdRepository = async (index, id, doc) => {
  return esClient.index({
    index,
    id,
    body: doc || {},
    refresh: true,
  });
};

export const getDocumentByIdRepository = async (index, id) => {
  return esClient.get({
    index: index,
    id,
  });
};

export const deleteDocumentRepository = async (index, id) => {
  return esClient.delete({
    index: index,
    id,
  });
};

export const updateDocumentByIdRepository = async (index, id, fieldsToUpdate, force) => {
  return esClient.update({
    index,
    id,
    doc: fieldsToUpdate,
    refresh: true,
    ...(force ? { doc_as_upsert: true } : {}),
  });
};

export const bulkUpdateDocumentsRepository = async (index, data) => {
  if (!data || !data.length) return null;

  const body = data.flatMap((doc) => [{ update: { _index: index, _id: doc.id } }, { doc: doc.fields }]);

  return esClient.bulk({ refresh: true, body, ignore_unavailable: true });
};

export const checkDocumentExistsRepository = async (index, id) => {
  const exists = await esClient.exists({
    index,
    id,
  });
  return exists;
};
