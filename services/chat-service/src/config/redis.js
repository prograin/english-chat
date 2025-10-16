import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config({ path: ".chat.env" });

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  db: 0,
});

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("ready", () => console.log("⚡ Redis ready"));
redis.on("error", (err) => console.error("❌ Redis error:", err));

export const subscriber = redis.duplicate();
export default redis;
