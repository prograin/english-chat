export const requests_was_sent_text = (ms: number, more: number) => {
  const seconds = Math.floor(ms / 1000);
  const moreSeconds = Math.floor(more / 1000);

  return `Request was sent ${seconds} second${seconds !== 1 ? "s" : ""} ago. Please wait ${moreSeconds} more second${
    moreSeconds !== 1 ? "s" : ""
  } before trying again.`;
};

export const send_request_text = `Your request has been sent.`;
export const recieved_request = (username: string) =>
  `You have a request from /username_${username}.\n If you want to start chatting, please press the Accept button.`;
