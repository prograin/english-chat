import { esClient } from "../config/elastic.js";

export const indexDocumentRepository = async (index, doc) => {
  return esClient.index({
    index: index,
    document: doc,
  });
};

export const indexDocumentByIdRepository = async (index, id, document) => {
  return esClient.index({
    index,
    id,
    document,
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

export const updateDocumentRepository = async (index, id, fieldsToUpdate) => {
  return esClient.update({
    index,
    id,
    doc: fieldsToUpdate,
  });
};

export const bulkUpdateDocumentsRepository = async (index, data) => {
  if (!data || !data.length) return null;

  const body = data.flatMap((doc) => [{ update: { _index: index, _id: doc.id } }, { doc: doc.fields }]);

  return esClient.bulk({ refresh: true, body });
};
