import redis from "../../../src/config/redis.js";

const keys = await redis.keys("*");
console.log(await redis.get(keys[0]));
await redis.del(keys[0]);
console.log(await redis.get(keys[0]));
console.log(keys);

await redis.disconnect();
