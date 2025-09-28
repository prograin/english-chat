import { profileRepository } from "../repositories/profileRepository.js";

export const profileService = {
  async addProfile(data) {
    return profileRepository.indexProfile(data);
  },

  async searchByName(name) {
    const query = {
      query: {
        match: { name },
      },
    };
    const { hits } = await profileRepository.searchProfiles(query);
    return hits.hits.map((h) => ({ id: h._id, ...h._source }));
  },
};
