import api from "../../../api";
import { formatProfileData } from "../utils/formatData";

export const fetchUserProfile = async () => {
  const response = await api.get("/profiles/me");
  return response.data.profile;
};

export const updateUserProfile = async (payload) => {
  const formattedData = formatProfileData(payload);
  const { data } = await api.put("/profiles/me", formattedData);
  return data;
};
