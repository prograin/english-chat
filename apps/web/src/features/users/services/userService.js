// features/users/services/userService.js
import axios from "axios";

export const fetchUserProfile = async () => {
  const { data } = await axios.get("/api/profile");
  return data;
};

export const updateUserProfile = async (payload) => {
  const { data } = await axios.put("/api/profile", payload);
  return data;
};
