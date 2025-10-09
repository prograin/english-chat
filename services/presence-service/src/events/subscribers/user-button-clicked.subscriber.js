import eventBus from "../bus/event.bus.js";
import { REDIS_CHANNELS } from "../../../../../shared/constants/redis.js";
import { setUsersLastActive } from "../../cache/users.cache.js";

export const initUserButtonClickedSubscriber = async () => {
  await eventBus.on(REDIS_CHANNELS.user.button.any.clicked, async (data) => {
    await setUsersLastActive(data.id, data.timestamp);
    console.log("🔔 New User Clicked:", data);
  });
};
