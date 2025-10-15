import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './db';

dotenv.config();

const PORT = process.env.PORT || 8787;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
