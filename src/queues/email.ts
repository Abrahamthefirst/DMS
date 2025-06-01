import { Worker } from "bullmq";

import { redisConnection } from "../config/queue";
import emailVerification from "../templates/emailVerification";
import emailService from "../services/emailService";

const service = new emailService();

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
  { connection: redisConnection }
);
