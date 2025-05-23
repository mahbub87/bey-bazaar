// /lib/contactMailer.ts
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "beybazaarbb@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendContactMail = async ({
  to,
  subject,
  text,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  text: string;
  replyTo?: string;
}) => {
  return transporter.sendMail({
    from: `"Bey Bazaar Contact" <beybazaarbb@gmail.com>`,
    to,
    subject,
    text,
    replyTo,
  });
};
