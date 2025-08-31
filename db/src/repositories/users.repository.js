import usersModel from "../models/users.model";

class UsersRepository {
  async createUser(data) {
    Object.keys(data).forEach((key) => {
      if (date[key] === undefined) delete data[key];
    });
    const user = await usersModel.create(data);

    return user;
  }

  async getUserById(id) {
    return await usersModel.findByPk(id);
  }

  async getUserByTelegramId(telegram_id) {
    try {
      const user = await usersModel.findOne({
        where: { telegram_id: telegram_id },
      });
      return user;
    } catch (error) {
      console.error(
        `Error fetching user with telegram_id ${telegram_id}:`,
        error
      );
    }
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
