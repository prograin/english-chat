import redis from "../config/redis.js";

class UsersCache {
  async getUserTelegram(userTelegramId) {
    redis.hget(`user:telegram:${userId}`);
  }
  async getUser(userId) {
    redis.hget(`user:${userId}`);
  }
}

export default UsersCache();
