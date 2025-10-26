import { AdminAxiosInstance } from "src/shared/utils/axios.util";

export const searchByInterestsService = async (userId: Number) => {
  const user = await AdminAxiosInstance.get(`http://${process.env.API_URL}:3004/user/${userId}/profile`, {});
};
