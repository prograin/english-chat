import { AdminAxiosInstance } from "src/utils/axios.util";
import UsersCache from "src/cache/user.cache";
import { AdminService, UserService } from "src/services/user.service";

export class UserController {
  static getUser = async (token: string) => {
    try {
      const user = await UserService.getUser(token);
      if (user.status === 200) {
        return { error: false, data: user.data, status: 200 };
      } else if (user.status === 404) {
        return { error: true, status: 404 };
      } else {
        throw new Error(`❌ Unexpected response status when fetching user: ${user.status}`);
      }
    } catch (error) {
      throw error;
    }
  };
}

export class AdminController {
  static createUser = async (data: object) => {
    const user = await AdminService.createUser(data);
    if ([201, 409].includes(user.status)) {
      return user;
    } else {
      throw new Error(`❌ Unexpected response status when creating user: ${user.status}`);
    }
  };

  static getUserByTelegramId = async (telegram_id: bigint) => {
    const user = await AdminService.getUserByTelegramId(telegram_id);

    if (user.status === 200 && user.data?.id) {
      return { error: false, data: user.data, status: user.status };
    } else if (user.status === 404) {
      return { error: true, status: user.status };
    } else {
      throw new Error(`❌ Unexpected response status when fetching user: ${user.status}`);
    }
  };
}
