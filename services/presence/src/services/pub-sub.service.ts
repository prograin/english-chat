import { subscriber } from "../../config/config.js";
import { zaddUserLastSeen } from "../cache/redis-client.js";
import dotenv from "dotenv";

dotenv.config();

subscriber.subscribe(
  process.env.PRESENCE_SUBSCRIBER_NAME,
  (err: Error | null, count: number) => {
    if (err) {
      console.error("Failed to subscribe:", err);
    } else {
      console.log(
        `✅ Subscribed successfully! Now subscribed to ${count} channel(s).`
      );
    }
  }
);

// Listen for messages on the channel
subscriber.on("message", async (channel: string, message: string) => {
  if (channel === process.env.PRESENCE_SUBSCRIBER_NAME) {
    const { user_id, statu, timestamp } = JSON.parse(message);
    if (!user_id || !timestamp) return;

    await zaddUserLastSeen(user_id, Number(timestamp));
    console.log(`📩 Message received on ${channel}: ${message}`);
  }
});
