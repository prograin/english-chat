import { normalizeNodeOptions } from "ioredis/built/cluster/util";
import usersCache from "../cache/users.cache";

export class UsersCacheHelper {
  static getUser = async (data) => {
    let user;
    user = await usersCache.getUserByTelegramId(data.telegram_id);
    if (user) {
      return user;
    } else {
      return null;
    }
  };
}
