import eventBus from "../bus/event.bus.js";
import { CHANNELS } from "../channels.js";

export const initUserClickedSubscriber = async () => {
  await eventBus.on(CHANNELS.USER.CLICKED, async (data) => {
    console.log("🔔 New User Clicked:", data);
  });
};
