import { publisher } from "../../config/redis.js";
import { CHANNELS } from "../channels.js";

export const publishSyncUsersPresenceCache = async () => {
  const data = JSON.stringify({ "cache-key": "users:last_active" });
  await publisher.publish(CHANNELS.SYNC.USERS.PRESENCE.CACHE, data);
};
