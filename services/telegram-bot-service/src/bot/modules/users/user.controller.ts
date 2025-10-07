import { UserAdminService, UserSelfService } from "src/bot/modules/users/user.service";

export class UserSelfController {
  static getUser = async (token: string) => {
    try {
      const user = await UserSelfService.getUser(token);
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

export class UserAdminController {
  static createUser = async (data: object) => {
    const user = await UserAdminService.createUser(data);
    if ([201, 409].includes(user.status)) {
      return user;
    } else {
      throw new Error(`❌ Unexpected response status when creating user: ${user.status}`);
    }
  };

  static getUserByTelegramId = async (telegram_id: bigint) => {
    const user = await UserAdminService.getUserByTelegramId(telegram_id);

    if (user.status === 200 && user.data?.id) {
      return { error: false, data: user.data, status: user.status };
    } else if (user.status === 404) {
      return { error: true, status: user.status };
    } else {
      throw new Error(`❌ Unexpected response status when fetching user: ${user.status}`);
    }
  };
}
