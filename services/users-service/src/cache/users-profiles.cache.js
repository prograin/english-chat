import redis from "../config/redis.js";
import { PREFIX_KEY } from "../../../../shared/constants/redis.js";

class UsersProfilesCache {
  PROFILE_TTL = 3600; // 1 hour

  async addUserProfile(id, data) {
    try {
      const key = PREFIX_KEY.user.profile.data(id);

      if (!(await redis.exists(key))) {
        await redis.hset(key, data);
      }
      await redis.expire(key, this.PROFILE_TTL);
    } catch (error) {
      console.error("❌ Error adding profile to cache:", error);
    }
  }

  async getUserProfile(id, fields = null) {
    try {
      const key = PREFIX_KEY.user.profile.data(id);
      const cached = fields ? await redis.hmget(key, ...fields) : await redis.hgetall(key);

      if (!cached || Object.keys(cached).length === 0) return null;

      await redis.expire(key, this.PROFILE_TTL);
      return cached;
    } catch (error) {
      console.error("❌ Error fetching profile from cache:", error);
      return null;
    }
  }

  async updateUserProfile(id, data) {
    try {
      const key = PREFIX_KEY.user.profile.data(id);
      const profile = await redis.hgetall(key);

      if (!profile || Object.keys(profile).length === 0) {
        console.warn(`UserProfile ${id} not found in cache`);
        return null;
      }

      const updated = { ...profile, ...data };
      await redis.hset(key, updated);
      await redis.expire(key, this.PROFILE_TTL);
      return updated;
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
