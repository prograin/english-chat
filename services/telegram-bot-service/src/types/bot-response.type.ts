import User from "./user.type";
export default interface BotResponse {
  user: User;
}

export const botResponseDefault = {
  user: { exists: false, id: null },
};
