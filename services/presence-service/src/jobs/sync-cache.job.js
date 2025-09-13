import cron from "node-cron";
import { syncUsersPresenceCachePublisher } from "../events/publishers/sync-users.publisher.js";

export const syncUsersPresenceCacheJob = cron.schedule("*/5 * * * * *", syncUsersPresenceCachePublisher);
