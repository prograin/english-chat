import axios from "axios";
import UsersCache from "src/cache/user.cache";

// --- Create User ---
export const createUserService = async (data: object) => {
  const user = await axios.post("http://localhost:3000/users/", data, {
    validateStatus: (status) => status < 500,
  });
  if ([201, 409].includes(user.status)) {
    await UsersCache.setUserIdByTelegramId(user.data.userTelegramId, user.data.id);
    return user;
  } else {
    throw new Error(`❌ Unexpected response status when creating user: ${user.status}`);
  }
};

// --- Get User By Telegram Id ---
export const getUserByTelegramIdService = async (telegram_id: bigint) => {
  let user;

  // --- Try to get user id with its telegram id from cache ---
  const userId = await UsersCache.getUserIdByTelegramId(telegram_id);
  if (userId) {
    // --- 1. Try to get by user id ---
    user = await axios.get(`http://localhost:3000/users/${userId}`);
    if (user.status === 200) {
      return { error: false, data: user.data, status: 200 };
    } else if (user.status === 404) {
      UsersCache.deleteUserByTelegramId(telegram_id);
      return { error: true, status: 404 };
    } else {
      UsersCache.deleteUserByTelegramId(telegram_id);
      throw new Error(`❌ Unexpected response status when fetching user: ${user.status}`);
    }
  } else {
    // --- 2. Try to get by telegram id ---
    user = await axios.get(`http://localhost:3000/users/?telegram_id=${telegram_id}`, {
      validateStatus: (status) => status < 500,
    });

    if (user.status === 200 && user.data?.id) {
      await UsersCache.setUserIdByTelegramId(user.data.telegram_id, user.data.id);
      return { error: false, data: user.data, status: user.status };
    } else if (user.status === 404) {
      return { error: true, status: user.status };
    } else {
      throw new Error(`❌ Unexpected response status when fetching user: ${user.status}`);
    }
  }
};
