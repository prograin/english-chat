import eventBus from "../bus/eventbus.js";
import { CHANNELS } from "../channels.js";
import usersCache from "../../cache/users.cache.js";
import usersRepository from "../../repositories/users.repository.js";

export const initSyncUsersPresenceCacheSubscriber = async () => {
  await eventBus.on(CHANNELS.SYNC.CACHE.USERS.PRESENCE, async (data) => {
    try {
      const users_last_active = await usersCache.getUsersLastActive();
      await usersRepository.updateBulkUsers(users_last_active);

      console.log("🔔 Successfully synced and updated user presence");
    } catch (error) {
      console.log("❌ Failed to sync users' presence cache with database:", error);
    }
  });
};
