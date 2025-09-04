// This is exactly where the Redis connection logic should live.
//Client: Any program that connects to the server to send commands.

import { redis } from "../config/redis.js";

export const zaddUserLastSeen = async (userId: number, timestamp: number) => {
  try {
    redis.zadd(`users_last_seen`, timestamp, userId.toString());
    console.log(
      `Updated last seen for user ${userId} at timestamp ${timestamp}`
    );
  } catch (error) {
    console.log("Redis ZADD error:", error);
  }
};
