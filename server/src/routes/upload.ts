import { Router } from 'express';
import multer from 'multer';
import { uploadImage } from '../services/cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { requireAuth } from '../middleware/auth';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/image', requireAuth, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const filename = `njcreative_${uuidv4()}`;
    const result: any = await uploadImage(req.file.buffer, filename);
    res.json({ url: result.secure_url, raw: result });
  } catch (err) { next(err); }
});

export default router;
