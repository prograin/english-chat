import cron from "node-cron";
import { publishSyncUsersPresenceCache } from "../events/publishers/sync-users-cache.publisher";

cron.schedule("*/5 * * * * *", async () => {
  try {
    await publishSyncUsersPresenceCache();
    console.log("Users presence cache synced ✅");
  } catch (err) {
    console.error("Failed to sync users presence cache:", err);
  }
});
