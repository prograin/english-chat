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
    return await Users.update(data, { where: { id } });
  }

  async deleteUser(id) {
    return await Users.destroy({ where: { id } });
  }

  async listUsers(limit = 10, offset = 0) {
    return await Users.findAll({ limit, offset });
  }
}

export default new UsersRepository();
