import { esClient } from "../config/elastic.js";

export const indexUser = async (profile) => {
  return esClient.index({
    index: "users",
    document: profile,
  });
};

export const indexUserById = async (id, profile) => {
  return esClient.index({
    index: "users",
    id,
    document: profile,
  });
};

export const searchUsers = async (query) => {
  return esClient.search({
    index: "users",
    body: query,
  });
};

export const getUserById = async (id) => {
  return esClient.get({
    index: "users",
    id,
  });
};

export const deleteUser = async (id) => {
  return esClient.delete({
    index: "users",
    id,
  });
};
