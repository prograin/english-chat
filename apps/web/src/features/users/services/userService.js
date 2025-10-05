import api from "../../../api";
import { formatOutputProfileData, formatInputProfileData } from "../utils/formatData";
import { DEFAULT_PROFILE } from "../constants/defaults";

export const fetchUserProfile = async () => {
  const response = await api.get("/profiles/me");

  const { id, user_id, latitude, longitude, ...cleaned } = response.data.profile;
  const normalized = { ...DEFAULT_PROFILE, ...cleaned };
  const formattedData = formatInputProfileData(normalized);

  return formattedData;
};

export const updateUserProfile = async (payload) => {
  const formattedData = formatOutputProfileData(payload);

  const { data } = await api.put("/profiles/me", formattedData);
  return data;
};
