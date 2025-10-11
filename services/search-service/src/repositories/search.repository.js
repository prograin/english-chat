import esClient from "../config/elastic.js";

export const searchRepository = async (index, body) => {
  return esClient.search({
    index: index,
    _source: true,
    body: body,
  });
};
