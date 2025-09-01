import redis from "../config/redis";

class UsersCache {
  /*** Save mapping telegram_id -> user_id ***/
  setUserIdByTelegramId = async (telegram_id: number, user_id: number) => {
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
  getUserIdByTelegramId = async (telegram_id: number) => {
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
}

export default new UsersCache();
