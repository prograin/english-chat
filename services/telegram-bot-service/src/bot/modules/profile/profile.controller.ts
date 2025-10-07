import { UserAdminService, UserSelfService } from "src/bot/modules/users/user.service";
import { ProfileUserService } from "src/bot/modules/profile/profile.service";

export class ProfileSelfController {
  static getProfile = async (token: string) => {
    try {
      const profile = await ProfileUserService.getProfile(token);
      if (profile.status === 200) {
        return { error: false, data: profile.data, status: 200 };
      } else if (profile.status === 404) {
        return { error: true, status: 404 };
      } else {
        throw new Error(`❌ Unexpected response status when fetching user: ${profile.status}`);
      }
    } catch (error) {
      throw error;
    }
  };
}

export class UserAdminController {}
