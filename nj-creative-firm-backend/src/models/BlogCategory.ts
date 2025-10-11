import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String }
});

export default model('BlogCategory', schema);
