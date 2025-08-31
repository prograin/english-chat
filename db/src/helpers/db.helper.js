import usersRepository from "../repositories/users.repository";

export class UsersDBHelper {
  static getUser = async (data) => {
    let user;
    user = await usersRepository.getUserByTelegramId(data.telegram_id);
    if (user) {
      return user;
    }

    user = await usersRepository.getUserByTelegramId(data.id);
    if (user) {
      return user;
    }

    return null;
  };
}
