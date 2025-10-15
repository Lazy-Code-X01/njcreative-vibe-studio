import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  // password is hashed
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model('Admin', adminSchema);
