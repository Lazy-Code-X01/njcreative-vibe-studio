import { Router } from 'express';
import BlogPost from '../models/BlogPost';
import BlogCategory from '../models/BlogCategory';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Get all posts
router.get('/posts', async (req, res, next) => {
  try {
    const posts = await BlogPost.find().populate('category').sort({ date: -1 }).lean();
    res.json(posts);
  } catch (err) { next(err); }
});

// Get single post by slug
router.get('/post/:slug', async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug }).populate('category').lean();
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) { next(err); }
});

// Get categories
router.get('/categories', async (req, res, next) => {
  try {
    const cats = await BlogCategory.find().lean();
    res.json(cats);
  } catch (err) { next(err); }
});

// Create post (admin)
router.post('/post', requireAuth, async (req, res, next) => {
  try {
    const payload = req.body;
    const post = await BlogPost.create(payload);
    res.status(201).json(post);
  } catch (err) { next(err); }
});

// Update post
router.put('/post/:id', requireAuth, async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (err) { next(err); }
});

// Delete post
router.delete('/post/:id', requireAuth, async (req, res, next) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

export default router;
