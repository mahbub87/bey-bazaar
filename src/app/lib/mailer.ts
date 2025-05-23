// lib/mailer.ts
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "beybazaarbb@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendMail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string | string[];
  subject: string;
  text?: string;  
  html?: string;
}) => {
  return transporter.sendMail({
    from: `"Bey Bazaar" <beybazaarbb@gmail.com>`,
    to,
    subject,
    text,
    html,
  });
};
