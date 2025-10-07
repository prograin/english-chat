import { UserAxiosInstance } from "src/shared/utils/axios.util";

export class ProfileUserService {
  static async getProfile(token: string) {
    const profile = await UserAxiosInstance.get(`http://localhost:3004/profiles/me`, {
      headers: { token: token },
      validateStatus: (status) => status < 500,
    });
    return profile;
  }
}
