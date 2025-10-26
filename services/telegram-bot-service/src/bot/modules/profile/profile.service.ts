import { AdminAxiosInstance, UserAxiosInstance } from "src/shared/utils/axios.util";

export class ProfileUserService {
  static async getProfile(token: string) {
    const profile = await UserAxiosInstance.get(`http://${process.env.API_URL}:3004/profiles/me`, {
      headers: { token: token },
      validateStatus: (status) => status < 500,
    });
    return profile;
  }

  static async getProfiles(token: string, userIds: string[]) {
    const profile = await UserAxiosInstance.get(`http://${process.env.API_URL}:3004/profiles`, {
      headers: { token: token },
      params: { userIds: userIds.join(",") },
      validateStatus: (status) => status < 500,
    });
    return profile;
  }
}

export class ProfileAdminService {
  static async getProfileByUsername(username: string) {
    const profile = await AdminAxiosInstance.get(`http://${process.env.API_URL}:3004/profiles/username/${username}`, {
      validateStatus: (status) => status < 500,
    });
    return profile;
  }
}
