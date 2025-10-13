import redis from "../config/redis.js";
import { PREFIX_KEY } from "../../../../shared/constants/redis.js";

class ProfilesCache {
  PROFILE_TTL = 60;

  async addProfileByUsername(username, data) {
    try {
      const key = PREFIX_KEY.user.profile.data(username);

      if (!(await redis.exists(key))) {
        await redis.set(key, JSON.stringify(data));
      }
      await redis.expire(key, this.PROFILE_TTL);
    } catch (error) {
      console.error("❌ Error adding profile by username to cache:", error);
    }
  }

  async getProfileByUsername(username) {
    try {
      const key = PREFIX_KEY.profile.username.key(username);
      const cached = await redis.get(key);

      if (!cached) return null;

      const cachedParsed = JSON.parse(cached);

      await redis.expire(key, this.PROFILE_TTL);
      return cachedParsed;
    } catch (error) {
      console.error("❌ Error fetching profile by username from cache:", error);
      return null;
    }
  }
}

export default new ProfilesCache();
