import { redis } from "../config/redis.js";

export const setUserLastActive = async (userId, timestamp) => {
  try {
    redis.zadd(`users:last_active`, timestamp, userId.toString());
    console.log(`Updated last seen for user ${userId} at timestamp ${timestamp}`);
  } catch (error) {
    console.log("Redis ZADD error:", error);
  }
};
