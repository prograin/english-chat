import cron from "node-cron";
import { bulkUpdatePresenceService } from "../services/presence.service.js";
import { getUsersLastActive, clearInactiveUsers } from "../cache/users.cache.js";

export const syncUsersPresenceCacheJob = cron.schedule("0 */5 * * * *", async () => {
  try {
    const users_last_active = await getUsersLastActive();
    await bulkUpdatePresenceService(users_last_active);

    console.log("🔔 Successfully synced and updated presence");
  } catch (error) {
    console.log("❌ Failed to sync presence cache with database:", error);
  }
});

export const clearInactiveUsersPresenceCacheJob = cron.schedule("0 */30 * * * *", async () => {
  try {
    const removedCount = await clearInactiveUsers();
    if (removedCount > 0) {
      console.log(`🧹 Cleared ${removedCount} inactive users (older than 5 minutes).`);
    }
  } catch (error) {
    console.error("Redis ZREMRANGEBYSCORE error:", error);
  }
});
