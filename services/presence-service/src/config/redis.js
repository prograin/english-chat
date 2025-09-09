// Use one subscriber connection for multiple channels.
// A client that is subscribed cannot issue normal commands (get, set, etc.) while in subscription mode.

import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();

export const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
});

export const subscriber = redis.duplicate();
export const publisher = redis.duplicate();
