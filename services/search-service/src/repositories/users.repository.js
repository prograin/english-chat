import { esClient } from "../config/elastic.js";

export const indexUserRepository = async (user) => {
  return esClient.index({
    index: "users",
    document: user,
  });
};

export const indexUserByIdRepository = async (id, user) => {
  return esClient.index({
    index: "users",
    id,
    document: user,
  });
};

export const getUserByIdRepository = async (id) => {
  return esClient.get({
    index: "users",
    id,
  });
};

export const deleteUserRepository = async (id) => {
  return esClient.delete({
    index: "users",
    id,
  });
};

export const updateUserRepository = async (id, fieldsToUpdate) => {
  return esClient.update({
    index: "users",
    id,
    doc: fieldsToUpdate,
  });
};

export const bulkUpdateUsersRepository = async (users) => {
  if (!users || !users.length) return null;

  const body = users.flatMap((user) => [
    { update: { _index: "users", _id: user.id } },
    { doc: user.fields },
  ]);

  return esClient.bulk({ refresh: true, body });
};
