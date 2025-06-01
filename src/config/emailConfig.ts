import nodemailer from "nodemailer";
export interface MailClient {
  sendMail(mailOptions: {
    to: string;
    from: string;
    subject: string;
    html: string;
  }): Promise<void>;
}

export class NodemailerClient implements MailClient {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(mailOptions: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    await this.transporter.sendMail(mailOptions);
  }
}
