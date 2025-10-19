import redis from "../../config/redis.js";
import { REDIS_STREAMS, REDIS_EVENTS } from "../../../../../shared/constants/redis.js";

class UserProducer {
  async publishUserDeleted(userId, data) {
    try {
      const messageId = redis.xadd(
        REDIS_STREAMS.user.name,
        "*",
        "event",
        REDIS_EVENTS.user.deleted,
        "userId",
        String(userId),
        "data",
        JSON.stringify(data)
      );
      return messageId;
    } catch {
      console.error("❌ Failed to publish user deleted:", err);
      throw err;
    }
  }
}

export default new UserProducer();
