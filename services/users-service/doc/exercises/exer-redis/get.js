import redis from "../../../src/config/redis.js";

const keys = await redis.keys("*");
const pipeline = redis.pipeline();
keys.forEach((key) => pipeline.get(key));
await pipeline.exec((error, results) => {
  console.log(results);
});

await redis.disconnect();
