import { REDIS_CHANNELS } from "../../../../../../shared/constants/redis";
import { publisher } from "src/shared/config/redis";
import { UserButtonClickedEvent } from "src/bot/types/user-button-clicked-event.type";

export const publishUserButtonClickedEvent = async (data: UserButtonClickedEvent) => {
  data.timestamp = Date.now();

  await publisher.publish(REDIS_CHANNELS.user.button.any.clicked, JSON.stringify(data));
};
