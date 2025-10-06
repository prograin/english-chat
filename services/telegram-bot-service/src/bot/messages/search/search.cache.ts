import redis from "src/shared/config/redis";
import { PREFIX_KEY } from "../../../../../../shared/constants/redis";

const SEARCH_TTL = 240;

export async function setUserTelegramSearch(userId: number, userTelgramSearch: object) {
  const key = PREFIX_KEY.user.telegram.search.key(userId);
  await redis.hset(key, data);
  await redis.expire(key, SEARCH_TTL);
}

export async function getUserTelegramSearch(userId: number, fields: string[] | null = null) {
  const key = PREFIX_KEY.user.telegram.search.key(userId);
  const cached = fields ? await redis.hmget(key, ...fields) : await redis.hgetall(key);
  if (!cached || Object.keys(cached).length === 0) return null;

  await redis.expire(key, SEARCH_TTL);
  return cached;
}
