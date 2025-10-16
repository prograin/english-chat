import { AdminAxiosInstance, UserAxiosInstance } from "src/shared/utils/axios.util";

export class UserSelfService {
  static getUser = async (token: string) => {
    return await UserAxiosInstance.get(`/user/me`, {
      headers: { token: token },
      validateStatus: (status) => status < 500,
    });
  };
}

export class UserAdminService {
  static createUser = async (data: object) => {
    return await AdminAxiosInstance.post("http://localhost:3004/users/", data, {
      validateStatus: (status) => status < 500,
    });
  };

  static getUser = async (id: number) => {
    return await AdminAxiosInstance.get(`http://localhost:3004/users/${id}`, {
      validateStatus: (status) => status < 500,
    });
  };

  static getUserByTelegramId = async (telegramId: bigint) => {
    return await AdminAxiosInstance.get(`http://localhost:3004/users/telegram/${telegramId}`, {
      validateStatus: (status) => status < 500,
    });
  };

  static searchUsersByQuery = async (page: number, query: object) => {
    return await AdminAxiosInstance.post(`http://localhost:3005/users/search/query?page=${page}`, query, {
      validateStatus: (status) => status < 500,
    });
  };
}
