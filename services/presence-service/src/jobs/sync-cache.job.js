import cron from "node-cron";
import { bulkUpdatePresenceService } from "../services/presence.service";
import { getUsersLastActive } from "../cache/users.cache";

export const syncPresenceCacheJob = cron.schedule("*/5 * * * * *", async () => {
  try {
    const users_last_active = await getUsersLastActive();
    await bulkUpdatePresenceService(users_last_active);

    console.log("🔔 Successfully synced and updated presence");
  } catch (error) {
    console.log("❌ Failed to sync presence cache with database:", error);
  }
});
