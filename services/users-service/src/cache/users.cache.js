import redis from "../config/redis.js";
import { PREFIX_KEY } from "../../../../shared/constants/redis.js";

class UsersCache {
  USERTTL = 3600;

  async addUser(id, data) {
    try {
      const key = PREFIX_KEY.user.data(id);

      if (!(await redis.exists(key))) {
        await redis.hset(key, data);
      }
      await redis.expire(key, this.USERTTL);
    } catch (error) {
      console.error(`Error adding user to cache:`, error);
    }
  }

  async getUser(id, fields = null) {
    try {
      const key = PREFIX_KEY.user.data(id);
      const cached = fields ? redis.hmget(key, fields) : redis.hgetall(key);

      if (!cached || Object.keys(cached).length === 0) return null;

      await redis.expire(key, this.USERTTL);
      return cached;
    } catch (error) {
      console.error(`Error fetching user from cache:`, error);
      return null;
    }
  }

  async updateUser(id, data) {
    try {
      const key = PREFIX_KEY.user.data(id);
      const user = await redis.hgetall(key);
      if (!user || Object.keys(user).length === 0) {
        console.warn(`User ${id} not found in cache`);
        return null;
      }

      const updatedData = { ...user, ...data };
      await redis.hset(key, updatedData);
      await redis.expire(key, this.USERTTL);
      return updatedData;
    } catch (error) {
      console.error("❌ Error updating user in cache:", error);
      return null;
    }
  }

  async deleteUser(id) {
    try {
      const key = PREFIX_KEY.user.data(id);
      await redis.del(key);
    } catch (error) {
      console.error(`Error deleting user from cache:`, error);
      return null;
    }
  }
}

export default new UsersCache();
