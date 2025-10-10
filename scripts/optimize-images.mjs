import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname, parse } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsDir = join(__dirname, '..', 'src', 'assets');
const outputDir = join(__dirname, '..', 'src', 'assets', 'webp');

async function optimizeImages() {
  try {
    console.log('Starting image optimization...');
    console.log('Assets directory:', assetsDir);
    console.log('Output directory:', outputDir);

    const files = await readdir(assetsDir);
    
    for (const file of files) {
      const ext = extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const inputPath = join(assetsDir, file);
        const outputPath = join(outputDir, `${parse(file).name}.webp`);
        
        console.log(`Converting ${file} to WebP...`);
        
        try {
          const info = await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);
          
          console.log(`Successfully converted ${file}:`, info);
        } catch (err) {
          console.error(`Error converting ${file}:`, err);
        }
      }
    }
    
    console.log('Image optimization complete!');
  } catch (err) {
    console.error('Error during image optimization:', err);
    process.exit(1);
  }
}

optimizeImages();
