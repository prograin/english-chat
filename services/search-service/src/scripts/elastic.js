import dotenv from "dotenv";

dotenv.config({ path: ".search.env" });

import esClient from "../config/elastic.js";

const refresh = async () => {
  await esClient.indices.refresh({ index: "users" });
};

const getIndices = async () => {
  const result = await esClient.cat.indices({
    format: "json",
  });
  result.forEach((index) => {
    console.log(index.index);
  });
  //   console.log(result);
};

const deleteIndices = async (indices) => {
  indices.forEach((index) => {
    esClient.indices.delete({
      index: index,
    });
  });
};

const getmapping = async (index) => {
  const map = await esClient.indices.getMapping({
    index: index,
  });
  console.log(JSON.stringify(map, null, 2));
};

const removeDocuments = async (index) => {
  await esClient.deleteByQuery({
    index,
    body: {
      query: {
        match_all: {},
      },
    },
  });
};

const getDocuments = async (index) => {
  const result = await esClient.search({
    index,
    size: 1000,
    query: {
      match_all: {},
    },
  });
  const documents = result.hits.hits.map((hit) => hit._id);
  console.log(documents);
};

const bulkDeleteDocuments = async (index, ids) => {
  const body = ids.flatMap((id) => ({ delete: { _index: index, _id: id } }));
  await esClient.bulk({ body });
};

// deleteIndices(["users"]);
// getIndices();

getDocuments("users");
// removeDocuments("users");
// bulkDeleteDocuments("users", ["31", "32"]);
