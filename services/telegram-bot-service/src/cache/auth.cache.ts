import redis from "../config/redis";
import { REDIS_CHANNELS } from "../../../../shared/constants/redis.js";

export const setUserToken = async (user_id: number, token: string) => {
  await redis.set(`${REDIS_CHANNELS.user.token}:${user_id}`, token);
};

export const getUserToken = async (user_id: number) => {
  return await redis.get(`${REDIS_CHANNELS.user.token}:${user_id}`);
};

export const setUserTelegramToken = async (user_id: number, token: string) => {
  await redis.set(`${REDIS_CHANNELS.user.telegram.token}:${user_id}`, token);
};

export const getUserTelegramToken = async (user_id: number) => {
  return await redis.get(`${REDIS_CHANNELS.user.telegram.token}:${user_id}`);
};
