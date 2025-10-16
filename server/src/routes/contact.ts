import { Router } from "express";
import { z } from "zod";
import multer from "multer";
import Message from "../models/Message";
import { sendEmail } from "../services/email";
import {
  renderAdminContactEmail,
  renderUserAutoReply,
} from "../services/email-template";

const router = Router();

// Multer setup for file upload
const upload = multer({ dest: "uploads/" });

const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  address: z.string().optional(),
  companyName: z.string().min(1),
  helpMessage: z.string().min(5),
  selectedServices: z.string(), // Will be parsed as JSON array
  dateTime: z.string().optional(),
  signature: z.string().optional(),
});

router.post("/", upload.single("companyLogo"), async (req, res, next) => {
  try {
    // Parse and validate body fields
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      companyName,
      helpMessage,
      selectedServices,
      dateTime,
      signature,
    } = req.body;

    // Validate using zod
    contactSchema.parse({
      firstName,
      lastName,
      email,
      phone,
      address,
      companyName,
      helpMessage,
      selectedServices,
      dateTime,
      signature,
    });

    // Parse selectedServices as array
    let servicesArr: string[] = [];
    try {
      servicesArr = JSON.parse(selectedServices);
    } catch {
      servicesArr = [];
    }

    // Handle file upload
    let companyLogoUrl = null;
    if (req.file) {
      companyLogoUrl = `/uploads/${req.file.filename}`;
    }

    // Store in DB (update Message model as needed)
    const doc = await Message.create({
      firstName,
      lastName,
      email,
      phone,
      address,
      companyName,
      helpMessage,
      selectedServices: servicesArr,
      dateTime,
      signature,
      companyLogo: companyLogoUrl,
    });

    // send email to admin
    try {
      await sendEmail({
        to:
          process.env.SMTP_USER ||
          process.env.SMTP_FROM ||
          "hello@njcreativefirm.com",
        subject: "New contact submission",
        html: renderAdminContactEmail({
          firstName,
          lastName,
          email,
          phone,
          address,
          companyName,
          helpMessage,
          selectedServices: servicesArr,
          dateTime,
          signature,
          companyLogo: companyLogoUrl,
        }),
      });
      // auto reply
      await sendEmail({
        to: email,
        subject: "We received your message",
        html: renderUserAutoReply({ name: firstName }),
      });
    } catch (err) {
      console.log("Email send failed", err);
      console.warn("Email send failed", err);
    }
    res.status(201).json({ message: "Submission received" });
  } catch (err) {
    next(err);
  }
});

// Get all messages (admin only)
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// Delete a message (admin only)
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
