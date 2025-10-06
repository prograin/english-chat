import User from "./user.type";
export default interface BotResponse {
  user: User;
  callback?: {
    data: {
      parts: string[];
      raw?: string | null;
    };
  };
}

export const botResponseDefault = {
  user: { exists: false, id: null },
};
