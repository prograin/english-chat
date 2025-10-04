import { AdminAxiosInstance } from "src/utils/axios.util";
const getProfileByUserId = (user_id: number) => {
  AdminAxiosInstance.get(`http://localhost:3004/profiles?user_id=${user_id}`);
};
