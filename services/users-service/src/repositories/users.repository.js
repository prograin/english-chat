import usersModel from "../models/users.model.js";

class UsersRepository {
  async createUser(data) {
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) delete data[key];
    });
    const user = await usersModel.create(data);

    return user;
  }

  async getUser(id) {
    return await usersModel.findByPk(id);
  }

  async getUserByTelegramId(telegram_id) {
    const user = await usersModel.findOne({
      where: { telegram_id: telegram_id },
    });
    return user;
  }

  async getUserByEmail(email) {
    usersModel.findOne({ where: { email: email } });
  }

  async updateUser(id, data) {
    return await usersModel.update(data, { where: { id } });
  }

  async updateBulkUsers(data) {
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

  async deleteUser(id) {
    return await usersModel.destroy({ where: { id } });
  }

  async listUsers(limit = 10, offset = 0) {
    return await usersModel.findAll({ limit, offset });
  }
}

export default new UsersRepository();
