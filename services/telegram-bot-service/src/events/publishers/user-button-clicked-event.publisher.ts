import { CHANNELS } from "../channels";
import { publisher } from "src/config/redis";
import { UserButtonClickedEvent } from "src/types/user-button-clicked-event.type";

export const publishUserButtonClickedEvent = async (data: UserButtonClickedEvent) => {
  data.timestamp = Date.now();

  await publisher.publish(CHANNELS.USER.BUTTON.ANY.CLICKED, JSON.stringify(data));
};
