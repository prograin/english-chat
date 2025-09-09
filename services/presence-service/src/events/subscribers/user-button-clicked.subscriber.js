import eventBus from "../bus/event.bus.js";
import { CHANNELS } from "../channels.js";
import { setUserLastActive } from "../../cache/users.cache.js";

export const initUserButtonClickedSubscriber = async () => {
  await eventBus.on(CHANNELS.USER.BUTTON.ANY.CLICKED, async (data) => {
    await setUserLastActive(data.id, data.timestamp);
    console.log("🔔 New User Clicked:", data);
  });
};
