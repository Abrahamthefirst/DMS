import { Worker } from "bullmq";

import emailVerification from "../templates/emailVerification";
import emailService from "../services/emailService";
import IoRedis from "ioredis"
const service = new emailService();
const connection = new IoRedis({maxRetriesPerRequest: null})

const worker = new Worker(
  "email",
  async (job) => {
    try {
      const { subject, to, username, link, expiration } = job.data;
      const html = emailVerification(username, link, expiration);
      await service.sendMail(
        subject,
        to,
        html,
        "Abraham <abrahamprogramming5@gmail.com>"
      );
      console.log(job);
      console.log(`Email sent for job ${job.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  { connection }
);
