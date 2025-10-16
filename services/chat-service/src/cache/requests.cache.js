import redis from "../config/redis.js";
import { PREFIX_KEY } from "../../../../shared/constants/redis.js";

class RequestsCache {
  REQUESTTTL = 600;

  async addNewRequest(userId, receiverId, data) {
    try {
      const key = PREFIX_KEY.user.chat.requests.key(userId, receiverId);
      await redis.set(key, JSON.stringify(data));
      await redis.expire(key, this.REQUESTTTL);
    } catch (error) {
      console.error(`Error adding request to cache:`, error);
    }
  }

  async getRequestByTarget(userId, receiverId) {
    try {
      const key = PREFIX_KEY.user.chat.requests.key(userId, receiverId);
      const cached = await redis.get(key);

      if (!cached) return null;

      await redis.expire(key, this.REQUESTTTL);
      return JSON.parse(cached);
    } catch (error) {
      console.error(`Error fetching user from cache:`, error);
      return null;
    }
  }
}

export default new RequestsCache();
