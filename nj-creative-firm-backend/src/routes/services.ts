import { Router } from 'express';
import { Service } from '../models/Service';
import { requireAuth } from '../middleware/auth';

const router = Router();

const INITIAL_SERVICES = [
  {
    serviceId: 'branding',
    icon: 'Palette',
    title: 'Branding & Rebranding',
    subtitle: 'Memorable, Strategic, Impactful',
    description: 'Crafting identities that communicate value and complete brand identity systems that capture your essence and resonate with your target audience.',
    features: ['Brand Strategy & Positioning', 'Logo & Visual Identity Design', 'Brand Guidelines & Systems', 'Marketing Collateral Design', 'Packaging & Print Design', 'Digital Asset Creation'],
    technologies: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Principle'],
    startingPrice: '$3,000',
    image: '/uploads/services/branding-rebranding.jpg',
    order: 1,
  },
  {
    serviceId: 'printing-and-banners',
    icon: 'Palette',
    title: 'Printing and Banners',
    subtitle: 'Distinct visuals that define your brand.',
    description: 'We create eye-catching banners and print designs that resonate with your target audience.',
    features: ['Banner Design', 'Flyers & Brochures', 'Business Cards', 'Packaging & Print Design'],
    technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'InDesign'],
    startingPrice: '$3,000',
    image: '/uploads/services/printing-banners.jpg',
    order: 2,
  },
  {
    serviceId: 'web-development',
    icon: 'Code',
    title: 'Website Design & Development',
    subtitle: 'Responsive, sleek, and conversion-driven websites.',
    description: 'Custom websites and web applications built with cutting-edge technologies that scale with your business growth.',
    features: ['Responsive Design & Development', 'E-commerce Solutions', 'Progressive Web Apps (PWA)', 'API Integration & Development', 'Performance Optimization', 'SEO-Ready Architecture'],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS'],
    startingPrice: '$5,000',
    image: '/uploads/services/web-development.jpg',
    order: 3,
  },
  {
    serviceId: 'ui-ux',
    icon: 'TrendingUp',
    title: 'UI/UX Design',
    subtitle: 'User-centered interfaces that boost engagement.',
    description: 'Strategic digital marketing campaigns that drive engagement, conversions, and sustainable growth.',
    features: ['User-Centered Design', 'Wireframing & Prototyping', 'Interaction Design', 'Information Architecture', 'Visual Design'],
    technologies: ['Figma', 'Sketch', 'Adobe XD', 'InVision'],
    startingPrice: '$2,500/mo',
    image: '/uploads/services/ui-ux-design.jpg',
    order: 4,
  },
  {
    serviceId: 'design-for-media',
    icon: 'TrendingUp',
    title: 'Ads management for media and Google',
    subtitle: 'Strategy, content, and analytics for digital presence.',
    description: 'We manage ads for Google, Facebook, Instagram, LinkedIn, and YouTube to ensure your brand is visible and reaching your target audience.',
    features: ['Ad Campaign Management', 'Ad Optimization', 'Ad Targeting', 'Ad Creative Development'],
    technologies: ['Google Analytics', 'SEMrush', 'Mailchimp', 'Facebook Ads'],
    startingPrice: '$2,500/mo',
    image: '/uploads/services/ads-management.jpg',
    order: 5,
  },
  {
    serviceId: 'marketing',
    icon: 'TrendingUp',
    title: 'Digital Marketing & Advertisment',
    subtitle: 'Targeted campaigns that deliver measurable ROI.',
    description: 'Strategic digital marketing campaigns that drive engagement, conversions, and sustainable growth.',
    features: ['SEO & Content Strategy', 'Social Media Marketing', 'Pay-Per-Click Advertising', 'Email Marketing Automation', 'Analytics & Reporting', 'Conversion Optimization'],
    technologies: ['Google Analytics', 'SEMrush', 'Mailchimp', 'Facebook Ads'],
    startingPrice: '$2,500/mo',
    image: '/uploads/services/digital-marketing.jpg',
    order: 6,
  },
  {
    serviceId: 'tech-solutions',
    icon: 'Cog',
    title: 'Tech Solutions',
    subtitle: 'Custom, Scalable, Innovative',
    description: 'Bespoke technology solutions including mobile apps, automation systems, and enterprise platforms.',
    features: ['Mobile App Development', 'Custom Software Solutions', 'System Integration', 'Process Automation', 'Cloud Solutions', 'Technical Consulting'],
    technologies: ['React Native', 'Python', 'AWS', 'Docker', 'PostgreSQL'],
    startingPrice: '$10,000',
    image: '/uploads/services/tech-solutions.jpg',
    order: 7,
  },
  {
    serviceId: 'ai-generation',
    icon: 'Cog',
    title: 'AI Generation',
    subtitle: 'Innovative AI-Driven Solutions',
    description: 'We leverage cutting-edge AI technologies to generate compelling content that engages and converts visitors.',
    features: ['AI-Driven Content Creation', 'AI-Powered Writing Assistance', 'AI-Inspired Storytelling', 'AI-Enhanced Creativity'],
    technologies: ['AI', 'Machine Learning', 'Natural Language Processing', 'Generative AI'],
    startingPrice: '$10,000',
    image: '/uploads/services/ai-generation.jpg',
    order: 8,
  },
  {
    serviceId: 'video-production',
    icon: 'Cog',
    title: 'Video Production',
    subtitle: 'Engaging visuals that elevate brand emotion.',
    description: 'Bespoke technology solutions including mobile apps, automation systems, and enterprise platforms.',
    features: ['Video Editing', 'Motion Graphics', 'VFX & VFX Compositing', 'Animation & Motion Design', 'Color Grading & Correction'],
    technologies: ['Adobe Premiere Pro', 'Final Cut Pro', 'After Effects'],
    startingPrice: '$10,000',
    image: '/uploads/services/video-production.jpg',
    order: 9,
  },
  {
    serviceId: 'recruitment-talent',
    icon: 'Cog',
    title: 'Recruitment Services',
    subtitle: 'Talent Acquisition & Hiring',
    description: 'We help you find the right talent for your business. We offer a range of services to help you attract, hire, and retain top talent.',
    features: ['Talent Acquisition', 'Talent Hiring', 'Talent Retention', 'Talent Development', 'Employer Branding'],
    technologies: ['LinkedIn Recruiter', 'Indeed', 'Glassdoor'],
    startingPrice: '$10,000',
    image: '/uploads/services/recruitment-services.jpg',
    order: 10,
  },
  {
    serviceId: 'seo',
    icon: 'Cog',
    title: 'SEO (Search Engine Optimization)',
    subtitle: '– Visibility through strategy and ranking.',
    description: 'We help you optimize your website for search engines and drive organic traffic to your site.',
    features: ['Keyword Research', 'On-Page Optimization', 'Off-Page Optimization', 'Content Marketing'],
    technologies: ['Google Analytics', 'SEMrush', 'Ahrefs'],
    startingPrice: '$1,500/mo',
    image: '/uploads/services/seo.jpg',
    order: 11,
  },
];

// Get all active services (public)
router.get('/', async (req, res, next) => {
  try {
    const services = await Service.find({ active: true }).sort({ order: 1 });
    res.json(services);
  } catch (err) {
    next(err);
  }
});

// Get all services including inactive (admin)
router.get('/all', requireAuth, async (req, res, next) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (err) {
    next(err);
  }
});

// Seed initial services (admin) — must be before /:id routes
router.post('/seed', requireAuth, async (req, res, next) => {
  try {
    const count = await Service.countDocuments();
    if (count > 0) {
      return res.status(400).json({ message: 'Services already seeded. Use edit to update individual services.' });
    }
    await Service.insertMany(INITIAL_SERVICES);
    res.json({ message: 'Services seeded successfully', count: INITIAL_SERVICES.length });
  } catch (err) {
    next(err);
  }
});

// Create new service (admin)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    next(err);
  }
});

// Update service (admin)
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    next(err);
  }
});

// Delete service (admin)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
