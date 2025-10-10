const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "src", "assets");

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, "src", "assets", "webp");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Process all images in the assets directory
fs.readdir(assetsDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if ([".png", ".jpg", ".jpeg"].includes(ext)) {
      const inputPath = path.join(assetsDir, file);
      const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);

      sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath)
        .then((info) => {
          console.log(`Converted ${file} to WebP format:`, info);
        })
        .catch((err) => {
          console.error(`Error converting ${file}:`, err);
        });
    }
  });
});
