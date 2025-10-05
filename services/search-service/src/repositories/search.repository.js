import esClient from "../config/elastic.js";

export const searchRepository = async (index, query) => {
  return esClient.search({
    index: index,
    source: false,
    body: query,
  });
};
