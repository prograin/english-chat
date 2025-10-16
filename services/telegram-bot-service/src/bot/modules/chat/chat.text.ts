export const requests_was_sent_text = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  return `Request was sent ${seconds} second${seconds !== 1 ? "s" : ""} ago`;
};
export const send_request_text = `Your request has been sent.`;
export const recieved_request = (username: string) =>
  `You have a request from /${username}.\n If you want to start chatting, please press the Accept button.`;
