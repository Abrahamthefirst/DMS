import { Queue } from "bullmq";
import IORedis from "ioredis";

export const redisConnection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: 5,
});

export const emailQueue = new Queue("email", { connection: redisConnection });

emailQueue.on("waiting", ({ jobId }) => {
  console.log(`A job with ID ${jobId} is waiting`);
});
