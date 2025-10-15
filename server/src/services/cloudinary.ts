import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export async function uploadImage(buffer: Buffer, filename: string) {
  // Cloudinary's Node SDK works with streams or local files; for simplicity we use upload with data URI
  const dataUri = `data:image/jpeg;base64,${buffer.toString('base64')}`;
  const res = await cloudinary.uploader.upload(dataUri, { public_id: filename, folder: 'njcreative' });
  return res;
}
