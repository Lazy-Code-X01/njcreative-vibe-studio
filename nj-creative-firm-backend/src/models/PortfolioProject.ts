import mongoose from 'mongoose';

const portfolioProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  client: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  results: [{ type: String }],
  link: { type: String },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const PortfolioProject = mongoose.model('PortfolioProject', portfolioProjectSchema);
