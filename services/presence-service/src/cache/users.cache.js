import { redis } from "../config/redis.js";

export const setUsersLastActive = async (userId, timestamp) => {
  try {
    redis.zadd(`users:last_active`, timestamp, userId.toString());
    console.log(`Updated last seen for user ${userId} at timestamp ${timestamp}`);
  } catch (error) {
    console.log("Redis ZADD error:", error);
  }
};

export const getUsersLastActive = async () => {
  const data = await redis.zrange(`users:last_active`, 0, -1, "WITHSCORES");

  const result = [];
  for (let i = 0; i < data.length; i += 2) {
    result.push({
      user_id: data[i],
      last_active: new Date(Number(data[i + 1]) * 1000),
    });
  }

  return result;
};
