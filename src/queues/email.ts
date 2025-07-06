import { Worker } from "bullmq";

import emailVerification from "../templates/emailVerification";
import EmailService from "../modules/email/email.service";
import IoRedis from "ioredis";
const connection = new IoRedis({ maxRetriesPerRequest: null });

class EmailWorker {
  constructor(private emailService: EmailService) {}
  worker = new Worker(
    "email",
    async (job) => {
      try {
        const { subject, to, username, link, expiration } = job.data;
        const html = emailVerification(username, link, expiration);
        await this.emailService.sendMail(
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
}
