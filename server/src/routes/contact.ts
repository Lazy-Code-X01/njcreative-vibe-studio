import { Router } from 'express';
import { z } from 'zod';
import Message from '../models/Message';
import { validateBody } from '../middleware/validate';
import { sendEmail } from '../services/email';
import { renderAdminContactEmail, renderUserAutoReply } from '../services/email-template';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5)
});

router.post('/', validateBody(contactSchema), async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    const doc = await Message.create({ name, email, phone, message });
    // send email to admin
    try {
      await sendEmail({ to: process.env.SMTP_USER || process.env.SMTP_FROM || 'hello@njcreativefirm.com', subject: 'New contact submission', html: renderAdminContactEmail({ name, email, phone, message }) });
      // auto reply
      await sendEmail({ to: email, subject: 'We received your message', html: renderUserAutoReply({ name }) });
    } catch (err) {
      console.warn('Email send failed', err);
    }
    res.status(201).json({ message: 'Submission received' });
  } catch (err) {
    next(err);
  }
});

export default router;
