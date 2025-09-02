import Redis from "ioredis";

async function main() {
  const redis = new Redis({
    host: "127.0.0.1",
    port: 6379,
  });

  try {
    // Await the promise to get keys
    const keys = await redis.keys("telegram_user:*");
    console.log("All keys:", keys);
    console.log(await redis.ttl(keys[0]));
  } catch (err) {
    console.error(err);
  } finally {
    await redis.disconnect();
  }
}

main();
