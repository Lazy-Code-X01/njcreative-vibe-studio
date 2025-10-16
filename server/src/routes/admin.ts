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

// Analytics endpoint
router.get('/analytics', async (req, res, next) => {
  try {
    const Message = (await import('../models/Message')).default;
    const BlogPost = (await import('../models/BlogPost')).default;
    const BlogCategory = (await import('../models/BlogCategory')).default;

    const totalPosts = await BlogPost.countDocuments();
    const totalMessages = await Message.countDocuments();
    const publishedPosts = await BlogPost.countDocuments({ published: true });

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentMessages = await Message.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

    const postsByCategory = await BlogPost.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $lookup: { from: 'blogcategories', localField: '_id', foreignField: '_id', as: 'categoryInfo' } },
      { $project: { category: { $arrayElemAt: ['$categoryInfo.name', 0] }, count: 1 } }
    ]);

    const monthlyActivity = await Message.aggregate([
      { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
      { $limit: 6 }
    ]);

    res.json({
      totalPosts,
      totalMessages,
      publishedPosts,
      recentMessages,
      postsByCategory,
      monthlyActivity
    });
  } catch (err) { next(err); }
});

export default router;
