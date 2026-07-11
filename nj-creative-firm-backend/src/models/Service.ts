import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  serviceId: { type: String, required: true, unique: true },
  icon: { type: String, default: 'Cog' },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  technologies: [{ type: String }],
  startingPrice: { type: String, required: true },
  image: { type: String, default: '' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Service = mongoose.model('Service', serviceSchema);
