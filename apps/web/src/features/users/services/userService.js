import api from "../../../api";
import { formatProfileData } from "../utils/formatData";

export const fetchUserProfile = async () => {
  const response = await api.get("/profile/me");
  return response.data.profile;
};

export const updateUserProfile = async (payload) => {
  const formattedData = formatProfileData(payload);
  const { data } = await api.put("/profile/me", formattedData);
  return data;
};
