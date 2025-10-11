import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 465);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.SMTP_FROM || '"NJ Creative Firm" <hello@njcreativefirm.com>';

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  if (!host || !user || !pass) {
    console.log('SMTP not configured. Email not sent.'); 
    console.log('Email preview:', { to, subject });
    return;
  }
  const transporter = nodemailer.createTransport({
    host, port, secure: port === 465,
    auth: { user, pass }
  });
  await transporter.sendMail({ from, to, subject, html });
}
