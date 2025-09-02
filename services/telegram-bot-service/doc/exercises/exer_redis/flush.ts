import Redis from "ioredis";

async function main() {
  const redis = new Redis({
    host: "127.0.0.1",
    port: 6379,
  });
  console.log(await redis.flushall());

  redis.disconnect();
}

main();
