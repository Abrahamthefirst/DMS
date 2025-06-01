import { MailClient } from "../config/emailConfig";
import { NodemailerClient } from "../config/emailConfig";
import "../queues/email"
class emailService {
  constructor(private mailClient: MailClient = new NodemailerClient()) {
    this.mailClient = mailClient;
  }

  async sendMail(subject: string, to: string, html: string, from: string) {
    try {
      const info = await this.mailClient.sendMail({
        from,
        to,
        subject,
        html,
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export default emailService;
