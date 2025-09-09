import { redis } from "../../../src/config/redis.js";

const data = await redis.zrange("users:last_active", 0, -1, "WITHSCORES");
console.log(data);
