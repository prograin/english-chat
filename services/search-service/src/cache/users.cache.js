//LINK services\search-service\doc\examples\users.cache.example.md

import { KEYS } from "../../../../shared/constants/redis";

export const getUsersLastActive = async () => {
  const data = await redis.zrange(KEYS.users.presence.last_active, 0, -1, "WITHSCORES");

  const result = [];
  for (let i = 0; i < data.length; i += 2) {
    result.push({
      id: data[i],
      data: { last_active: new Date(Number(data[i + 1])) },
    });
  }
  return result;
};
