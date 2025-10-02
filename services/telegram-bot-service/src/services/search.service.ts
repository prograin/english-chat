import { AdminAxiosInstance } from "src/utils/axios.util";

export const searchByInterestsService = async (userId: Number) => {
  const user = await AdminAxiosInstance.get(`http://localhost:3004/user/${userId}/profile`, {});
};
