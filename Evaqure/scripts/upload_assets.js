import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dtx3jvozs',
  api_key: '387515192585761',
  api_secret: 'pGIIw_doA-20spEF26LTuVpsvk0'
});

const assetsDir = path.join(__dirname, '../src/assets');
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

async function uploadImages() {
  try {
    const files = fs.readdirSync(assetsDir);
    console.log(`Found ${files.length} items in assets directory.`);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        console.log(`Skipping non-image/unsupported file: ${file}`);
        continue;
      }

      const filePath = path.join(assetsDir, file);
      const publicId = path.basename(file, ext); // file name without extension
      console.log(`Uploading ${file} as public ID 'Evaqure/${publicId}'...`);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'Evaqure',
        public_id: publicId,
        overwrite: true,
        invalidate: true
      });

      console.log(`Successfully uploaded: ${file} -> ${result.secure_url}`);
    }

    console.log('All image assets have been uploaded to Cloudinary successfully.');
  } catch (error) {
    console.error('Error during asset upload:', error);
    process.exit(1);
  }
}

uploadImages();
