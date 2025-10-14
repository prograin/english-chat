import { error, profile } from "console";
import { ProfileUserService, ProfileAdminService } from "src/bot/modules/profile/profile.service";

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

export class ProfileAdminController {
  static getProfileByUsername = async (username: string) => {
    try {
      const response = await ProfileAdminService.getProfileByUsername(username);
      if (response.status === 200) {
        return response.data.profile;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
