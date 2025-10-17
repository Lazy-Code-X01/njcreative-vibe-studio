import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './db';
import { seedAdmin } from './utils/seedAdmin';
import { seedDatabase } from './utils/seedDatabase';
import { seedPortfolio } from './utils/seedPortfolio';

dotenv.config();

const PORT = process.env.PORT || 8787;

async function start() {
  try {
    await connectDB();
    await seedAdmin();
    await seedDatabase();
    await seedPortfolio();
    
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
