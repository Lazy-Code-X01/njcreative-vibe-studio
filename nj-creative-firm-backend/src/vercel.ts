import app from './app';
import { connectDB } from './db';
import { seedAdmin } from './utils/seedAdmin';
import { seedDatabase } from './utils/seedDatabase';
import { seedPortfolio } from './utils/seedPortfolio';

let isConnected = false;

async function init() {
  if (!isConnected) {
    try {
      await connectDB();
      await seedAdmin();
      await seedDatabase();
      await seedPortfolio();
      isConnected = true;
      console.log("✅ MongoDB connected and seeds loaded");
    } catch (err) {
      console.error("❌ Failed to connect MongoDB or seed data:", err);
    }
  }
}

init();

export default app;
