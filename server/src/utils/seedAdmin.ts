import Admin from '../models/Admin';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export async function seedAdmin() {
  const user = process.env.ADMIN_USERNAME || 'admin';
  const pass = process.env.ADMIN_API_KEY;
  if (!pass) {
    console.log('ADMIN_API_KEY not set; skipping admin seed');
    return;
  }
  const exists = await Admin.findOne({ username: user }).lean();
  if (exists) return;
  const hash = await bcrypt.hash(pass, 10);
  await Admin.create({ username: user, passwordHash: hash });
  console.log('Admin seeded');
}
