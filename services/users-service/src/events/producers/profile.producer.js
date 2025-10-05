import redis from "../../config/redis.js";

import { REDIS_STREAMS, REDIS_EVENTS } from "../../../../../shared/constants/redis.js";

class ProfileProducer {
  async publishProfileUpdated(userId, data) {
    try {
      const messageId = await redis.xadd(
        REDIS_STREAMS.user.profile,
        "*",
        "event",
        REDIS_EVENTS.user.profile.updated,
        "userId",
        String(userId),
        "data",
        JSON.stringify(data)
      );

      return messageId;
    } catch {
      console.error("❌ Failed to publish profile updated:", err);
      throw err;
    }
  }
}

export default new ProfileProducer();
