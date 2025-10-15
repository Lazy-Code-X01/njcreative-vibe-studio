import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  featuredImage: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'BlogCategory' },
  tags: { type: [String], default: [] },
  published: { type: Boolean, default: false },
  readTime: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export default model('BlogPost', schema);
