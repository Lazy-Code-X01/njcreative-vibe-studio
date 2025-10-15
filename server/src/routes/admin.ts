import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Admin from '../models/Admin';
import bcrypt from 'bcrypt';

dotenv.config();

const router = Router();

// Basic login: check ADMIN_API_KEY from env OR check MongoDB admin collection
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const envKey = process.env.ADMIN_API_KEY;
    let valid = false;
    let adminId: string | undefined;
    if (envKey && username === 'admin' && password === envKey) {
      valid = true;
      adminId = 'env-admin';
    } else {
      const admin = await Admin.findOne({ username }).lean();
      if (admin) {
        const match = await bcrypt.compare(password, (admin as any).passwordHash);
        if (match) {
          valid = true;
          adminId = admin._id.toString();
        }
      }
    }
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: adminId, username }, process.env.JWT_SECRET || 'secure_secret', { expiresIn: '7d' });
    res.json({ token });
  } catch (err) { next(err); }
});

export default router;
