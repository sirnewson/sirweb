
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const SRC_FILE = 'C:/Users/User/.gemini/antigravity/brain/a0cd9cd7-90fe-417c-93f7-5b0519b10a9b/light_pack_cover_1766496336112.png';
const DEST_DIR = 'f:/CODING/Sir/website/public/assets/images';
const DEST_FILE = 'light_pack_cover.webp';

const main = async () => {
    if (!fs.existsSync(DEST_DIR)) {
        fs.mkdirSync(DEST_DIR, { recursive: true });
    }

    try {
        const destPath = path.join(DEST_DIR, DEST_FILE);
        await sharp(SRC_FILE)
            .webp({ quality: 80 })
            .toFile(destPath);
        console.log(`Converted and moved to ${destPath}`);
    } catch (err) {
        console.error(`Error processing file:`, err);
    }
};

main();
