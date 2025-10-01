import { AdminAxiosInstance } from "src/utils/axios.util";
import UsersCache from "src/cache/user.cache";

export const searchByInterestsService = async (user_id) => {
  const user = await AdminAxiosInstance.get(`http://localhost:3004/profile/${user_id}`, {});
};
