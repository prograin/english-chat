import api from "../../../api";

export const fetchUserProfile = async () => {
  const { data } = await api.get("/profile/me");
  return data;
};

export const updateUserProfile = async (payload) => {
  const { data } = await api.put("/profile", payload);
  return data;
};
