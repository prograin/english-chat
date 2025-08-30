import usersModel from "../models/users.model";

class UsersRepository {
  async createUser(data) {
    Object.keys(data).forEach((key) => {
      if (date[key] === undefined) delete data[key];
    });
    return await usersModel.create(data);
  }

  async getUserById(id) {
    return await usersModel.findByPk(id);
  }

  async getUserByTelegramId(telegram_id) {
    usersModel.findOne({ where: { telegram_id: telegram_id } });
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
