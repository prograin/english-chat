import redis from "../../../src/config/redis.js";

const keys = await redis.keys("*");
const pipeline = redis.pipeline();
console.log(keys);
keys.forEach((key) => {
  if (key !== "users:last_active") pipeline.get(key);
});
await pipeline.exec((error, results) => {
  console.log(results);
});

console.log(await redis.zrange("users:last_active", 0, -1, "WITHSCORES"));
redis.disconnect();

// ---------

import { redis } from "../../../src/config/redis.js";

const data = await redis.zrange("users:last_active", 0, -1, "WITHSCORES");
console.log(data);
