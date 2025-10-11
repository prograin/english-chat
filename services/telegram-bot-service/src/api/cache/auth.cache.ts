import redis from "../../shared/config/redis";
import { PREFIX_KEY } from "../../../../../shared/constants/redis.js";

export const setUserToken = async (user_id: number, token: string) => {
  await redis.set(PREFIX_KEY.user.token.key(user_id), token);
};

export const getUserToken = async (user_id: number) => {
  return await redis.get(PREFIX_KEY.user.token.key(user_id));
};

export const setUserTelegramToken = async (user_id: number, token: string) => {
  await redis.set(PREFIX_KEY.user.telegram.token.key(user_id), token);
};

export const getUserTelegramToken = async (user_id: number) => {
  return await redis.get(PREFIX_KEY.user.telegram.token.key(user_id));
};
