import { subscriber } from "../../config/redis.js";
import { REDIS_CHANNELS } from "../../../../../shared/constants/redis.js";

class EventBus {
  constructor() {
    this.handlers = {};
  }
  async init() {
    const channels = [REDIS_CHANNELS.user.button.any.clicked];
    await subscriber.subscribe(...channels);

    subscriber.on("message", async (channel, message) => {
      console.log(`📩 Event received [${channel}]: ${message}`);

      if (this.handlers[channel]) {
        for (const handler of this.handlers[channel]) {
          await handler(JSON.parse(message));
        }
      }
    });
  }

  async on(event, handler) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event].push(handler);
  }
}

export default new EventBus();
