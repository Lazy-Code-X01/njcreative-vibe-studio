import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  companyName: { type: String, required: true },
  helpMessage: { type: String, required: true },
  selectedServices: { type: [String], default: [] },
  dateTime: { type: String },
  signature: { type: String },
  companyLogo: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default model('Message', messageSchema);
