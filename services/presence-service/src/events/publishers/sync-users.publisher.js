import { publisher } from "../../config/redis.js";
import { CHANNELS } from "../channels.js";

export const syncUsersPresenceCachePublisher = async () => {
  try {
    const data = { key_name: "users:last_active" };
    await publisher.publish(CHANNELS.SYNC.CACHE.USERS.PRESENCE, JSON.stringify(data));

    console.log("✅ Users presence cache successfully synced");
  } catch (error) {
    console.error("❌ Failed to sync Users presence cache:", error);
  }
};
