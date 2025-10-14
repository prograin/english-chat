import redis from "src/shared/config/redis";
import { PREFIX_KEY } from "../../../../../../shared/constants/redis";

const SEARCH_TTL = 240;

export async function setUserTelegramSearch(userId: number, messageId: number, data: object) {
  const key = PREFIX_KEY.user.telegram.search.key(userId, messageId);
  await redis.set(key, JSON.stringify(data));
  await redis.expire(key, SEARCH_TTL);
}

export async function getUserTelegramSearch(userId: number, message_id: number) {
  const key = PREFIX_KEY.user.telegram.search.key(userId, message_id);
  const cached = await redis.get(key);
  if (!cached) return null;

  const cachedParsed = JSON.parse(cached);
  if (!cached || Object.keys(cachedParsed).length === 0) return null;

  await redis.expire(key, SEARCH_TTL);
  return cachedParsed;
}
