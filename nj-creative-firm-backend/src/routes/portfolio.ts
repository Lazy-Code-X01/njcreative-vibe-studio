import { Router } from 'express';
import { PortfolioProject } from '../models/PortfolioProject';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Get all portfolio projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await PortfolioProject.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// Get single project by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const project = await PortfolioProject.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// Create new project (Admin only)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const project = new PortfolioProject(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

// Update project (Admin only)
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const project = await PortfolioProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// Delete project (Admin only)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const project = await PortfolioProject.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
