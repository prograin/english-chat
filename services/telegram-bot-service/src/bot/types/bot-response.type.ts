import User from "./user.type";
export default interface BotResponse {
  user: User;
  callback?: {
    data: {
      parts: string[];
      raw: string;
    };
  };
}

export const botResponseDefault = {
  user: { exists: false, id: null, permissions: { search: [] } },
};
