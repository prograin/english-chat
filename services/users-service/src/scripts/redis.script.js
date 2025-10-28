import redis from "../config/redis.js";

async function clearAllStreams(maxRetries = 5) {
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      // پیدا کردن همه کلیدها
      const keys = await redis.keys("*");
      if (keys.length === 0) {
        console.log("هیچ stream یا keyی برای پاک کردن وجود ندارد.");
        return;
      }

      // فقط streamها را فیلتر می‌کنیم (XINFO برای چک کردن نوع)
      const streams = [];
      for (const key of keys) {
        const type = await redis.type(key);
        if (type === "stream") streams.push(key);
      }

      if (streams.length === 0) {
        console.log("هیچ streamی پیدا نشد.");
        return;
      }

      // پاک کردن همه streamها
      await redis.del(streams);
      console.log(`✅ تمام streamها پاک شدند:`, streams);
      return;
    } catch (err) {
      attempts++;
      console.warn(`Attempt ${attempts} failed:`, err.message);
      if (attempts >= maxRetries) {
        console.error("❌ پاک کردن streamها بعد از 5 تلاش ناموفق بود!");
        throw err;
      }
      await new Promise((res) => setTimeout(res, 100)); // کمی صبر قبل از retry
    }
  }
}

// استفاده
clearAllStreams(5).finally(() => redis.disconnect());
