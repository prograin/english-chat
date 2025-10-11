import cron from "node-cron";
import { getUsersLastActive } from "../cache/users.cache";
import { bulkUpdateDocsService } from "../services/documents.service";

export const syncUsersPresenceCacheJob = cron.schedule("*/5 * * * * *", async () => {
  try {
    const users_last_active = await getUsersLastActive();
    await bulkUpdateDocsService("users", users_last_active);
    console.log("🔔 Successfully synced and updated elasticsearch");
  } catch (error) {
    console.log("❌ Failed to sync presence cache with elasticsearch:", error);
  }
});
