import redis from "../config/redis.js";
import { PREFIX_KEY } from "../../../../shared/constants/redis.js";

class BlocksCache {
  BLOCK_TTL = 60; // TTL for single block cache (seconds)
  USERS_BLOCKS_TTL = 120; // TTL for user's blocks list cache (seconds)

  async setBlock(userId, targetId, value = true) {
    try {
      const key = PREFIX_KEY.relations.blocks.key(userId, targetId);
      const stringValue = value ? "1" : "0";
      await redis.set(key, stringValue, "EX", this.BLOCK_TTL);
    } catch (error) {
      console.error(`[BlocksCache] Error setting block cache:`, error);
    }
  }

  async getBlock(userId, targetId) {
    try {
      const key = PREFIX_KEY.relations.blocks.key(userId, targetId);
      const cached = await redis.get(key);

      if (cached === null) return null;

      // Refresh TTL for sliding expiration
      await redis.expire(key, this.BLOCK_TTL);

      return cached === "1";
    } catch (error) {
      console.error(`[BlocksCache] Error fetching block from cache:`, error);
      return null;
    }
  }

  async deleteBlock(userId, targetId) {
    try {
      const key = PREFIX_KEY.relations.blocks.key(userId, targetId);
      await redis.del(key);
    } catch (error) {
      console.error(`[BlocksCache] Error deleting block cache:`, error);
    }
  }
}

export default new BlocksCache();
