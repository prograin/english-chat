import { RedisStreamConsumer } from "./base.consumer.js";
import { REDIS_STREAMS, REDIS_EVENTS } from "../../../../../shared/constants/redis.js";
import { deleteUserService } from "../../services/users.service.js";
import usersCache from "../../cache/users.cache.js";
import usersProfilesCache from "../../cache/users-profiles.cache.js";

const handleUser = async ({ event, userId, data }) => {
  switch (event) {
    case REDIS_EVENTS.user.deleted:
      try {
        await usersCache.deleteUser(userId);
        await usersProfilesCache.deleteUserProfile(userId);
        await deleteUserService(userId);
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
  group: "user-service-group",
  consumerName: `user-worker-${process.pid}`,
  handleMessage: handleUser,
});
