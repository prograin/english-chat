import usersModel from "../models/users.model.js";

export async function createUser(data, options = {}) {
  const user = await usersModel.create(data, options);

  return user;
}

export async function getUser(id, options = {}) {
  return await usersModel.findByPk(id, options);
}

export async function getUserByTelegramId(telegram_id) {
  const user = await usersModel.findOne({
    where: { telegram_id: telegram_id },
  });
  return user;
}

export async function getUserByEmail(email) {
  usersModel.findOne({ where: { email: email } });
}

export async function updateUser(id, data) {
  return await usersModel.update(data, { where: { id } });
}

export async function updateBulkUsers(data) {
  try {
    for (const item of data) {
      await usersModel.update(item, { where: { id: item.id } });
    }
    return { message: "Bulk update completed" };
  } catch (error) {
    console.error("Error updating users:", error);
    throw error;
  }
}

export async function deleteUser(id) {
  return await usersModel.destroy({ where: { id } });
}

export async function listUsers(limit = 10, offset = 0) {
  return await usersModel.findAll({ limit, offset });
}
