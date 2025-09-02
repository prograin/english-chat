import redis from "../config/redis.js";

class UsersCache {
  USERTTL = 3600;

  async addUser(id, data) {
    try {
      const key = `user:${id}`;

      if (await redis.exists(key)) {
        await redis.expire(key, this.USERTTL);
      } else {
        await redis.set(key, JSON.stringify(data), "EX", this.USERTTL);
      }
    } catch (error) {
      console.error(`Error adding user to cache:`, error);
    }
  }

  async addUserLastActiveByTelegramId(telegramId, last_active = Date.now()) {
    await redis.set(`last_active:${telegramId}`, last_active, {
      EX: 10 * 24 * 3600,
    });
  }

  async getUserLastActiveByTelegramId(telegramId) {
    return await redis.get(`last_active:${telegramId}`);
  }

  async getUsersActive() {
    const keys = await redis.keys("last_active:*");
    const pipeline = redis.pipeline();
    keys.forEach((key) => pipeline.get(key));
    const results = pipeline.exec();

    await redis.get("last_active");
  }

  async getUser(id) {
    try {
      const key = `user:${id}`;
      const cached = await redis.get(key);
      await redis.expire(key, this.USERTTL);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error(`Error fetching user from cache:`, error);
      return null;
    }
  }

  async deleteUser(id) {
    try {
      const key = `user:${id}`;
      await redis.del(key);
    } catch (error) {
      console.error(`Error deleting user from cache:`, error);
      return null;
    }
  }
}

export default new UsersCache();
