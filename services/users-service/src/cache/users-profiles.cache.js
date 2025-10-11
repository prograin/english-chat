import redis from "../config/redis.js";
import { PREFIX_KEY } from "../../../../shared/constants/redis.js";

class UsersProfilesCache {
  PROFILE_TTL = 3600; // 1 hour

  async addUserProfile(id, data) {
    try {
      const key = PREFIX_KEY.user.profile.data(id);

      if (!(await redis.exists(key))) {
        await redis.set(key, JSON.stringify(data));
      }
      await redis.expire(key, this.PROFILE_TTL);
    } catch (error) {
      console.error("❌ Error adding profile to cache:", error);
    }
  }

  async getUserProfile(id) {
    try {
      const key = PREFIX_KEY.user.profile.data(id);
      const cached = await redis.get(key);

      if (!cached) return null;

      const cachedParsed = JSON.parse(cached);

      await redis.expire(key, this.PROFILE_TTL);
      return cachedParsed;
    } catch (error) {
      console.error("❌ Error fetching profile from cache:", error);
      return null;
    }
  }

  async updateUserProfile(id, data) {
    try {
      const key = PREFIX_KEY.user.profile.data(id);
      const profile = await redis.get(key);

      if (!profile) {
        console.warn(`UserProfile ${id} not found in cache`);
        return null;
      }

      await redis.set(key, JSON.stringify(data));
      await redis.expire(key, this.PROFILE_TTL);
      return data;
    } catch (error) {
      console.error("❌ Error updating profile in cache:", error);
      return null;
    }
  }

  async deleteUserProfile(id) {
    try {
      const key = PREFIX_KEY.user.profile.data(id);
      await redis.del(key);
    } catch (error) {
      console.error("❌ Error deleting profile from cache:", error);
      return null;
    }
  }
}

export default new UsersProfilesCache();
