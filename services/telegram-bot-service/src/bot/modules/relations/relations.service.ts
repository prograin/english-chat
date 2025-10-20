import { UserAxiosInstance } from "src/shared/utils/axios.util";

export class RelationsSelfService {
  //-------------------Contacts-----------------
  static async userContacts(token: string) {
    const response = await UserAxiosInstance.get(`http://localhost:3007/relations/contacts`, {
      headers: { token: token },
      validateStatus: (status) => status < 500,
    });
    return response;
  }

  static async createContact(token: string, targetId: string) {
    const response = await UserAxiosInstance.post(
      `http://localhost:3007/relations/contacts`,
      { targetId },
      {
        headers: { token: token },
        validateStatus: (status) => status < 500,
      }
    );
    return response;
  }

  static async deleteContactByTargetId(token: string, targetId: string) {
    const response = await UserAxiosInstance.delete(`http://localhost:3007/relations/contacts/${targetId}`, {
      headers: { token: token },
      validateStatus: (status) => status < 500,
    });
    return response;
  }

  static async checkContactByTargetId(token: string, targetId: string) {
    const response = await UserAxiosInstance.get(`http://localhost:3007/relations/contacts/check/${targetId}`, {
      headers: { token: token },
      validateStatus: (status) => status < 500,
    });
    return response;
  }

  //-------------------Blocks-----------------
  static async userBlocks(token: string) {
    const response = await UserAxiosInstance.get(`http://localhost:3007/relations/blocks`, {
      headers: { token: token },
      validateStatus: (status) => status < 500,
    });
    return response;
  }

  static async createBlock(token: string, targetId: string) {
    const response = await UserAxiosInstance.post(
      `http://localhost:3007/relations/blocks`,
      { targetId },
      {
        headers: { token: token },
        validateStatus: (status) => status < 500,
      }
    );
    return response;
  }

  static async deleteBlockByTargetId(token: string, targetId: string) {
    const response = await UserAxiosInstance.delete(`http://localhost:3007/relations/blocks/${targetId}`, {
      headers: { token: token },
      validateStatus: (status) => status < 500,
    });
    return response;
  }

  static async checkBlockByTargetId(token: string, targetId: string) {
    const response = await UserAxiosInstance.get(`http://localhost:3007/relations/blocks/check/${targetId}`, {
      headers: { token: token },
      validateStatus: (status) => status < 500,
    });
    return response;
  }
}
