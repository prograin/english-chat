import { RedisStreamConsumer } from "./base.consumer.js";
import { REDIS_STREAMS, REDIS_EVENTS } from "../../../../../shared/constants/redis.js";
import { createPresenceService, deletePresenceByUserIdService } from "../../services/presence.service.js";
import { deleteUserCache } from "../../cache/users.cache.js";
import userProducer from "../producers/user.producer.js";

const handleUser = async ({ event, userId, data }) => {
  switch (event) {
    case REDIS_EVENTS.user.added:
      try {
        await createPresenceService({ user_id: userId });
      } catch (error) {
        if (error.status !== 409) {
          await userProducer.publishUserDeleted(userId, {});
        }
      }
      break;

    case REDIS_EVENTS.user.deleted:
      try {
        await deleteUserCache(userId);
        await deletePresenceByUserIdService(userId);
      } catch (error) {
        if (error.status !== 404) {
          throw error;
        }
      }
      break;

    default:
      console.warn("Unknown event:", event);
  }
};

export const userConsumer = new RedisStreamConsumer({
  stream: REDIS_STREAMS.user.name,
  group: "relations-service-group",
  consumerName: `search-worker-${process.pid}`,
  handleMessage: handleUser,
});
