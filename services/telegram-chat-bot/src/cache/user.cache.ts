import redis from "../config/redis.js";

/*** Save mapping telegram_id -> user_id ***/
export const setUserIdByTelegramId = async (
  telegram_id: bigint,
  user_id: bigint
) => {
  try {
    await redis.set(
      `telegram_user:${telegram_id}`,
      user_id.toString(),
      "EX",
      86400
    ); // TTL: 24h
  } catch (error) {
    console.error("❌ Redis SET error:", error);
    throw error;
  }
};

/*** Get user_id by telegram_id ***/
export const getUserIdByTelegramId = async (telegram_id: bigint) => {
  try {
    const userId = await redis.get(`telegram_user:${telegram_id}`);
    if (userId) {
      await redis.expire(`telegram_user:${telegram_id}`, 86400);
      return BigInt(userId);
    } else {
      return null;
    }
  } catch (error) {
    console.error("❌ Redis GET error:", error);
    throw error;
  }
};
