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

  async getUser(id) {
    try {
      const key = `user:${id}`;
      const cached = await redis.get(key);

      if (Object.keys(cached).length === 0) return null;

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
