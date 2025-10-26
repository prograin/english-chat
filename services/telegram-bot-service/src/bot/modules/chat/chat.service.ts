import { AdminAxiosInstance, UserAxiosInstance } from "src/shared/utils/axios.util";

export class ChatSelfService {
  static async getRequestByTarget(token: string, targetId: number) {
    const request = await UserAxiosInstance.get(`http://${process.env.API_URL}:3006/chat/requests/target/${targetId}`, {
      headers: { token: token },
      validateStatus: (status) => status < 500,
    });
    return request;
  }

  static async createRequest(token: string, senderId: number, recieverId: number) {
    const request = await UserAxiosInstance.post(
      `http://${process.env.API_URL}:3006/chat/requests`,
      { sender_user_id: senderId, reciever_user_id: recieverId, status: "pending" },
      {
        headers: { token: token },
        validateStatus: (status) => status < 500,
      }
    );
    return request;
  }
}

// export class ProfileAdminService {
//   static async getProfileByUsername(username: string) {
//     const profile = await AdminAxiosInstance.get(`http://localhost:3004/profiles/username/${username}`, {
//       validateStatus: (status) => status < 500,
//     });
//     return profile;
//   }
// }
