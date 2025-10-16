import { ChatSelfService } from "src/bot/modules/chat/chat.service";

export class ChatSelfController {
  static getRequestByTarget = async (token: string, tagetId: number) => {
    try {
      const request = await ChatSelfService.getRequestByTarget(token, tagetId);
      if (request.status === 200) {
        return { error: false, request: request.data.request, status: 200 };
      } else if (request.status === 404) {
        return { error: true, status: 404 };
      } else {
        throw new Error(`❌ Unexpected response status when fetching request: ${request.status}`);
      }
    } catch (error) {
      throw error;
    }
  };

  static createRequest = async (token: string, senderId: number, recieverId: number) => {
    try {
      const request = await ChatSelfService.createRequest(token, senderId, recieverId);
      if (request.status === 200) {
        return { error: false, request: request.data.request, status: 200 };
      } else if (request.status === 404) {
        return { error: true, status: 404 };
      } else {
        throw new Error(`❌ Unexpected response status when creating request: ${request.status}`);
      }
    } catch (error) {
      throw error;
    }
  };
}
