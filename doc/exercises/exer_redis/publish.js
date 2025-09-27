// publisher.js
import Redis from "ioredis";

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

(async () => {
  try {
    const message = { a: 1 };
    await redis.publish("user-clicked", JSON.stringify(message));
    console.log("Message published:", message);

    await redis.disconnect();
  } catch (err) {
    console.error("Publish error:", err);
  }
})();
