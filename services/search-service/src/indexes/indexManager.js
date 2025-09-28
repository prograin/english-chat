import esClient from "../config/elastic.js";
import { userMapping } from "./usersIndex.js";

/**
 * @param {String} indexName
 * @param {Object} mapping
 */
export const createIndex = async (indexName, mapping) => {
  const exists = await esClient.indices.exists({ index: indexName }); // <-- add await

  if (!exists) {
    await esClient.indices.create({
      index: indexName,
      body: mapping,
    });
    console.log(`Index ${indexName} created.`);
  } else {
    console.log(`Index ${indexName} already exists.`);
  }
};

/**
 * @param {String} indexName
 */
export async function deleteIndex(indexName) {
  const exists = await esClient.indices.exists({ index: indexName });
  if (exists) {
    await esClient.indices.delete({ index: indexName });
    console.log(`Index ${indexName} deleted.`);
  }
}

export async function initIndexes() {
  await createIndex("users", userMapping);
}
