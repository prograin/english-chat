import { AdminAxiosInstance, UserAxiosInstance } from "src/utils/axios.util";

export class UserService {
  static getUser = async (token: string) => {
    return await UserAxiosInstance.get(`/user/me`, {
      headers: { token: token },
      validateStatus: (status) => status < 500,
    });
  };
}

export class AdminService {
  static createUser = async (data: object) => {
    return await AdminAxiosInstance.post("http://localhost:3004/admin/user/", data, {
      validateStatus: (status) => status < 500,
    });
  };

  static getUser = async (userId: bigint) => {
    return await AdminAxiosInstance.get(`/admin/user/${userId}`, {
      validateStatus: (status) => status < 500,
    });
  };

  static getUserByTelegramId = async (telegramId: bigint) => {
    return await AdminAxiosInstance.get(`http://localhost:3004/admin/user?telegram_id=${telegramId}`, {
      validateStatus: (status) => status < 500,
    });
  };
}
