import { RedisStreamConsumer } from "./base.consumer.js";
import { REDIS_STREAMS, REDIS_EVENTS } from "../../../../../shared/constants/redis.js";
import { updateDocByIdService } from "../../services/documents.service.js";

const handleProfile = async ({ event, userId, data }) => {
  switch (event) {
    case REDIS_EVENTS.user.profile.updated:
      await updateDocByIdService("users", userId, data);
      break;
    default:
      console.warn("Unknown event:", event);
  }
};

export const profileConsumer = new RedisStreamConsumer({
  stream: REDIS_STREAMS.user.profile,
  group: "search-service-group",
  consumerName: `search-worker-${process.pid}`,
  handleMessage: handleProfile,
});
