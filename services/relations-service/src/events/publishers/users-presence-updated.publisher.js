import { publisher } from "../../config/redis.js";
import { REDIS_CHANNELS } from "../../../../../shared/constants/redis.js";

export const publishUsersPresenceUpdated = async () => {
  const data = JSON.stringify({ "cache-key": "users:last_active" });
  await publisher.publish(REDIS_CHANNELS.users.presence.updated, data);
};
