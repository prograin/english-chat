import { subscriber } from "../../config/redis.js";
import { CHANNELS } from "../channels.js";
class EventBus {
  constructor() {
    this.handlers = {};
  }

  async init() {
    const channels = [CHANNELS.SYNC.CACHE.USERS.PRESENCE];
    await subscriber.subscribe(...channels);

    subscriber.on("message", async (channel, message) => {
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
